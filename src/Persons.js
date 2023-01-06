import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "./queries";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th> hrllo</th>
            <th> gelllo</th>
          </tr>
        </thead>
        <tbody>
            {persons.map((n) => (
              <tr key={n.id}>
                <td>{n.name}</td>
                <td>{n.phone}</td>
                <td>

                <button onClick={() => setNameToSearch(n.name)}>
                  show address
                </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
