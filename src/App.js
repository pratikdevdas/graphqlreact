import { useQuery } from '@apollo/client'
import Persons from './Persons'
import PersonForm from './PersonForm'
import { ALL_PERSONS } from './queries'

function App() {
  const result = useQuery(ALL_PERSONS)

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
