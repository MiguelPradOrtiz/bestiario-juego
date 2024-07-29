import axios from 'axios';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';  
import DeleteIcon from '@mui/icons-material/Delete';

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
              <IconButton aria-label="delete" color="warning" onClick={() => handleDelete(monster.id)}>
                <DeleteIcon />
              </IconButton>
            </div>             
          </div>
        </div>
      ))}
    </div>
  );
}
