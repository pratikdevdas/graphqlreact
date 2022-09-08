import React,{useState} from 'react'
import {gql,useQuery} from '@apollo/client'

const FIND_PERSON = gql `
 query findPersonByName($nameToSearch: String!){
  findPerson(name: $nameToSearch){
    name
    phone
    id
    address{
      street
      city
    }
  }
 }
`

const Person = ({person, onClose}) => {
  return (
    <div>
      <h2>
        {person.name}
      </h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={onClose}>close</button>
    </div>
  )
  
}
const Persons = ({persons}) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data){
    return (
      <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)}/>
    )
  }
  return (
    <div>{persons.map(n => <div key={n.id}>{n.name}{n.phone}
    <button onClick={()=> setNameToSearch(n.name)}>
      show address
    </button>
    </div>)}</div>
  )
}

export default Persons