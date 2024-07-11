import axios from 'axios';
import React from 'react'
import { useState, useRef } from 'react';


function Formulario({addMonster}) {
    const [nombre, setNombre] = useState('');
    const [strong, setStrong] = useState([]);
    const [drops, setDrops] = useState('');
    const [level, setLevel] = useState('');
    const [imagen, setImagen] = useState(null);
    const imagenRef = useRef(null);

    const handleCheckboxChange = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        setStrong([...strong, value]);
      } else {
        setStrong(strong.filter((item) => item !== value));
      }
    };

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
          setStrong([]);
          setDrops('');
          setLevel('');
          setImagen(null);
          imagenRef.current.value = '';
          document.querySelectorAll('input[type=checkbox]').forEach(checkbox => checkbox.checked = false);
          
        })
        .catch(error => {
          console.error("Error al agregar el monstruo ", error);
        })
      };

  return (
    <>
    <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />        
        <input type="text" placeholder="Drops" value={drops} onChange={(e) => setDrops(e.target.value)} required />
        <input type="number" min="0" placeholder="Nivel" value={level} onChange={(e) => setLevel(e.target.value)} required />
        <div className="checkbox-container">
          <span>Resistencias: </span>
          {["Fuego", "Agua", "Rayo", "Hielo", "Viento", "Oscuridad", "Sagrado"].map((elemento, index) => (
            <label key={index} className={`checkbox-label ${elemento.toLowerCase()}`}>
              <input type="checkbox" value={elemento} onChange={handleCheckboxChange} />
              <span>{elemento}</span>
            </label>
          ))}
        </div>
        <input type="file" ref={imagenRef} onChange={(e) => setImagen(e.target.files[0])} required />
        
        <button type="submit">Agregar Monstruo</button>
    </form>
    </>
  )
}

export default Formulario