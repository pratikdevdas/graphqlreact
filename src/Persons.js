import React,{useState} from 'react'
import {useQuery} from '@apollo/client'
import { FIND_PERSON } from './queries'

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