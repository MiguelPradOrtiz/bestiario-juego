import axios from 'axios';
import React from 'react'
import { useState, useRef } from 'react';


function Formulario({addMonster}) {
    const [nombre, setNombre] = useState('');
    const [strong, setStrong] = useState([]);
    const [weak, setWeak] = useState([]);
    const [drops, setDrops] = useState('');
    const [level, setLevel] = useState('');
    const [imagen, setImagen] = useState(null);
    const imagenRef = useRef(null);

    const handleStrongMonster = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        setStrong([...strong, value]);
      } else {
        setStrong(strong.filter((item) => item !== value));
      }
    };

    const handleWeakMonster = (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        setWeak([...weak, value]);
      } else {
        setWeak(weak.filter((item) => item !== value));
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('strong', strong);
        formData.append('weak', weak);
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
          setWeak([]);
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
        <div className='info-container-stats'> 
          <label>Nombre</label>
          <input type="text" name='Nombre' placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />     
          <label>Drops</label>  
          <input type="text" placeholder="Drops" value={drops} onChange={(e) => setDrops(e.target.value)} required />
          <label>Nivel</label>
          <input type="number" min="0" placeholder="Nivel" value={level} onChange={(e) => setLevel(e.target.value)} required />
        </div>
        <div className="checkbox-container">
          <span>Resistencias: </span>
          {["Fuego", "Agua", "Rayo", "Hielo", "Viento", "Oscuridad", "Sagrado"].map((elemento, index) => (
            <label key={index} className={`checkbox-label ${elemento.toLowerCase()}`}>
              <input type="checkbox" value={elemento} onChange={handleStrongMonster} />
              <span>{elemento}</span>
            </label>
          ))}
        </div>
        <div className="checkbox-container">
          <span>Debilidades: </span>
          {["Fuego", "Agua", "Rayo", "Hielo", "Viento", "Oscuridad", "Sagrado"].map((elemento, index) => (
            <label key={index} className={`checkbox-label ${elemento.toLowerCase()}`}>
              <input type="checkbox" value={elemento} onChange={handleWeakMonster} />
              <span>{elemento}</span>
            </label>
          ))}
        </div>
        <div className='img-container-reg'>
          <input type="file" ref={imagenRef} onChange={(e) => setImagen(e.target.files[0])} required />
        </div>
        
        <button type="submit">Agregar Monstruo</button>
    </form>
    </>
  )
}

export default Formulario