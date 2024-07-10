import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';


function Formulario({addMonster}) {
    const [nombre, setNombre] = useState('');
    const [strong, setStrong] = useState('');
    const [drops, setDrops] = useState('');
    const [level, setLevel] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('strong', strong);
        formData.append('drops', drops);
        formData.append('level', level);
        formData.append('imagen', imagen);
    
        axios.post('http://localhost:3000/api/monster', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          addMonster(response.data);  // Agrega el nuevo monstruo al estado de App
          setNombre('');
          setStrong('');
          setDrops('');
          setLevel('');
          setImagen(null);
          
        })
        .catch(error => {
          console.error("Error al agregar el monstruo ", error);
        })
      };

  return (
    <>
    <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Resistencia" value={strong} onChange={(e) => setStrong(e.target.value)} required />
        <input type="text" placeholder="Drops" value={drops} onChange={(e) => setDrops(e.target.value)} required />
        <input type="number" min="0" placeholder="Nivel" value={level} onChange={(e) => setLevel(e.target.value)} required />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} required />
        <button type="submit">Agregar Monstruo</button>
    </form>
    </>
  )
}

export default Formulario