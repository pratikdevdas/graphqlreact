import { gql, useQuery } from '@apollo/client'
import Persons from './Persons'
import PersonForm from './PersonForm'

const ALL_PERSONS = gql`
query{
  allPersons{
    name
    phone
    id
  }
}`

function App() {
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  if ( result.loading){
    return <div>loading...</div>
  }
  return (
    <div className="App">
      <PersonForm />
  <Persons persons={result.data.allPersons}/>
    </div>
  );  
}

export default App;
