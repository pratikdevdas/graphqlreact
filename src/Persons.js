import React from 'react'

const Persons = ({persons}) => {
  return (
    <div>{persons.map(n => <div key={n.id}>{n.name}{ n.phone}</div>)}</div>
  )
}

export default Persons