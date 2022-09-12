import React,{useState} from 'react'
import { useQuery } from '@apollo/client'
import Persons from './Persons'
import PersonForm from './PersonForm'
import { ALL_PERSONS } from './queries'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  
  const result = useQuery(ALL_PERSONS)

  if ( result.loading){
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=>{setErrorMessage(null)},1000)
  }
  return (
    <div className="App">
      <Notify errorMessage={errorMessage}/>
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
    </div>
  );  
}

const Notify = ({errorMessage}) => {
  if (!errorMessage) {
    return null
  }
  return(
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}
export default App;
