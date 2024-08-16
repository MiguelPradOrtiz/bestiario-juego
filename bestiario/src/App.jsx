import React, { useState, useEffect } from 'react';
import Formulario from './Formulario';
import Card from './Card';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/monster`);
        setData(response.data);
      } catch (error) {
        console.error("Error en el fetching de datos", error);
      }
    };

    fetchData();
  }, []);

  const addMonster = (monster) => {
    setData([...data, monster]);
  };

  return (
    <div className="app">
      <h1 className='title'>Bestiario</h1>
      <Formulario addMonster={addMonster} />
      <Card data={data} setData={setData} />
    </div>
  );
};

export default App;