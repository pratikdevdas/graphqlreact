import React, { useState, useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import PhoneForm from "./PhoneForm";
import LoginForm from "./LoginForm";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";

export const updateCache = (cache, query, addedPerson)=>{
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item)=>{
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query,({allPersons})=>{
    return {
      allPersons : uniqByName(allPersons.concat(addedPerson))
    }
  })
}


function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("phonenumbers-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useSubscription(PERSON_ADDED,{
    onData: ({data, client}) =>{
      const addedPerson = data?.data?.personAdded
      updateCache(client.cache, { query: ALL_PERSONS}, addedPerson)
    }
  })
  
  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = (parameters) => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }
  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};
export default App;