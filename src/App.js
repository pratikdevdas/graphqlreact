import { gql, useQuery } from '@apollo/client'
import Persons from './Persons'

const ALL_PERSONS = gql`
query{
  allPersons{
    name
    phone
    id
  }
}`

function App() {
  const result = useQuery(ALL_PERSONS)

  if ( result.loading){
    return <div>loading...</div>
  }
  return (
    <div className="App">
  <Persons persons={result.data.allPersons}/>
    </div>
  );  
}

export default App;
