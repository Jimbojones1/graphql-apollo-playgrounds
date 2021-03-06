import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from "graphql-tag";
import { Button, Card } from 'semantic-ui-react';

const Contacts = ({data, mutate, handleEditState}) => {
  // console.log(mutate, editContactProp, mutate.editContact);
  console.log('=======================================')
  console.log(mutate)
  console.log('=======================================')
  console.log('=======================================')

  console.log('=======================================')

  console.log('=======================================')
  const deleteContact = (id, e) => {
    console.log(typeof id)
    mutate({
       variables: {id: parseInt(id)},
       update: (store, { data: { deleteContact }, error}) => {
            console.log(error, ' this is erroe')
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: contactsListQuery });
            // // Add our comment from the mutation to the end.
            console.log(data, ' data inside of update')
            data.contacts.splice(id, 1);
            // console.log(updatedList, ' this is it')
            // // // Write our data back to the cache.
            store.writeQuery({ query: contactsListQuery, data});
          },
    })
  }

  // const editContact = (contact, e) => {
  //   console.log(editContactProp, ' this is editContactProp', contact)
  //   editContactProp({
  //      variables: {id: parseInt(contact.id), contact: contact},
  //      update: (store, { data: { editContact }, error}) => {
  //           console.log(error, ' this is error')
  //           console.log(editContact)
  //           // Read the data from our cache for this query.
  //           const data = store.readQuery({ query: contactsListQuery });
  //           // // edit contact
  //           console.log(data, ' data inside of update')
  //           data.contacts[editContact.id] = editContact;
  //           // console.log(updatedList, ' this is it')
  //           // // // Write our data back to the cache.
  //           store.writeQuery({ query: contactsListQuery, data});
  //         },
  //   })
  // };


  if(data.loading){
    return <p>Loading...</p>
  }

  if(data.error){
    return <p>{data.error.message}</p>
  }

  const contactList = data.contacts.map((contact) => {
    return <Card key={contact.id}>
              <Card.Content>
                <Card.Header>{contact.firstName} {" " + contact.lastName}</Card.Header>

              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color="red" onClick={deleteContact.bind(null, contact.id)}>Delete</Button>
                  <Button basic color="green" onClick={handleEditState.bind(null, true, contact)}>Edit</Button>
                </div>
              </Card.Content>
            </Card>
  })

  return (
    <Card.Group className="centered">
      {contactList}
    </Card.Group>
    )
}

export const contactsListQuery = gql`
  query {
    contacts {
      id
      firstName
      lastName
    }
  }
`
export const deleteContactMutation = gql`
  mutation deleteContact($id: ID!)
  {
    deleteContact(id: $id)
  }
`



export default compose(
  graphql(contactsListQuery),
  graphql(deleteContactMutation)
  )(Contacts);
