import React, { useState, useEffect } from "react";
import api from "./services/api";
import { uuid } from "uuidv4";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      id: uuid(),
      title: "Egua pocotó",
      url: "http://github.com/serginho",
      techs: ["master of zoeira", "medley do maracuja"],
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    let repoCopy = [...repositories];

    await api.delete(`/repositories/${id}`).then((response) => {
      const repoIndex = repositories.findIndex((repo) => repo.id === id);
      if (repoIndex < 0) {
        return;
      }
      repoCopy.splice(repoIndex, 1);
    });

    setRepository(repoCopy);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
