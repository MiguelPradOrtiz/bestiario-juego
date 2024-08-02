import axios from 'axios';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';  
import DeleteIcon from '@mui/icons-material/Delete';
import SvgIcon from '@mui/material/SvgIcon';
import MonsterEditModal from './MonsterUpdtModal';

export default function Card({ data, setData }) {
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [open, setOpen] = useState(false);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/monster/${id}`)
    .then(response => {
      setData(data.filter(monster => monster.id !== id));
    })
    .catch(error => {
      console.error("Error al eliminar ", error);
    });
  };

  const handleOpen = (monster) => {
    setSelectedMonster(monster);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMonster(null);
  };

  const handleUpdate = (updatedMonster) => {
    axios.put(`http://localhost:3000/api/monster/${updatedMonster.id}`, updatedMonster)
    .then(response => {
      setData(data.map(monster => (monster.id === updatedMonster.id ? updatedMonster : monster)));
    })
    .catch(error => {
      console.error("Error al actualizar", error);
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
            <SvgIcon style={{cursor: 'pointer'}} onClick={() => handleOpen(monster)}>    
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </svg>
          </SvgIcon>
              <IconButton aria-label="delete" color="warning" onClick={() => handleDelete(monster.id)}>
                <DeleteIcon />
              </IconButton>
            </div>             
          </div>
        </div>
      ))}
      <MonsterEditModal
        open={open}
        handleClose={handleClose}
        monster={selectedMonster}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
