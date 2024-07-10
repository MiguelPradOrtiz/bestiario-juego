import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Card({ data, setData }) {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/monster/${id}`)
    .then(response => {
      setData(data.filter(monster => monster.id !== id));
    })
    .catch(error => {
      console.error("Error al eliminar ", error);
    });
  };

  return (
    <div className="card-container">
      {data.map((monster) => (
        <div className="card" key={monster.id}>
          <img className='img-monster' src={monster.url_imagen} alt={monster.nombre} />
          <h2>{monster.nombre}</h2>
          <div className="info-container">
            <p><strong>Nivel: </strong> {monster.level}</p>
            <p><strong>Drops:</strong> {monster.drops}</p>
            <p><strong>Resistencias:</strong></p>
            <ul>
              {monster.strong.map((strongItem, idx) => (
                <li key={idx}>{strongItem}</li>
              ))}
            </ul>
            <button onClick={() => handleDelete(monster.id)}>Eliminar</button>              
          </div>
        </div>
      ))}
    </div>
  );
}
