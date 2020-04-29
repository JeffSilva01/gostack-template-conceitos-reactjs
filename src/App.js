import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  async function handleAddRepository() {

    console.log('aqui')
    api.post('/repositories', { 
      title: "React",
      url: "http://localhost",
      techs: "react"
    }).then(
      response => {
        console.log(response)
        setRepositories([...repositories, response.data])
      }
    )


  };

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);

    const result = repositories.filter(repository => repository.id !== id);

    setRepositories(result)

  };

  useEffect(()=>{
    api.get('/repositories').then(
      response => {
        setRepositories(response.data);
      }
    )
  },[]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
