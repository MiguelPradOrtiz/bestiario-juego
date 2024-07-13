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
          <div className='img-container'>
            <img className='img-monster' src={monster.url_imagen} alt={monster.nombre} />
          </div>
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
            <p><strong>Debilidades:</strong></p>
            <ul className="weak-list">
              {monster.weak.map((weakIteam, idx) => (
                <li key={idx}>{weakIteam}</li>
              ))}
            </ul>
            <div className='delete-container'>
              <button className='btn-delete' onClick={() => handleDelete(monster.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                  <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                </svg>
              </button> 
            </div>             
          </div>
        </div>
      ))}
    </div>
  );
}
