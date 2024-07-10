import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

const App = () => {
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState('');
  const [strong, setStrong] = useState('');
  const [drops, setDrops] = useState('');
  const [level, setLevel] = useState('');
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/monster')
    .then(response => {
      setData(response.data);
    }) 
    .catch(error => {
      console.error("Error en el fetching de datos", error)
    })
  }, []);

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
      setData([...data, response.data]);
      
    })
    .catch(error => {
      console.error("Error al agregar el monstruo ", error);
    })
  };
  

  return (
  <div className="app">
      <h1 className='title'>Bestiario</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Resistencia" value={strong} onChange={(e) => setStrong(e.target.value)} required />
        <input type="text" placeholder="Drops" value={drops} onChange={(e) => setDrops(e.target.value)} required />
        <input type="number" min="0" placeholder="Nivel" value={level} onChange={(e) => setLevel(e.target.value)} required />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} required />
        <button type="submit">Agregar Monstruo</button>
      </form>
      <div className="card-container">
        {data.map((monster, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
