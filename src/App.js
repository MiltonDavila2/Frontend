import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [datos, setDatos] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/enviar/generar')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setError('Error al obtener datos. Intente más tarde.');
      });
  }, []);

  return (
    <div className="container">
      <h1>Recomendaciones de Investigadores</h1>

      {error && <p className="loading">{error}</p>}

      {datos === null && !error && (
        <p className="loading">Cargando datos...</p>
      )}

      {datos && datos.length === 0 && !error && (
        <p className="loading">No hay recomendaciones disponibles.</p>
      )}

      {datos && datos.length > 0 && (
        <div className="card-grid">
          {datos.map((item, index) => (
            <div className="card" key={index}>
              <h2>{item.nombreInvestigador}</h2>
              <p><strong>Cédula:</strong> {item.cedulaInvestigador}</p>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
