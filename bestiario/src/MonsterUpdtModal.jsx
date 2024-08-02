import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const MonsterEditModal = ({ open, handleClose, monster, handleUpdate }) => {
  const [editedMonster, setEditedMonster] = useState(monster || {});

  useEffect(() => {
    if (monster) {
      setEditedMonster(monster);
    }
  }, [monster]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMonster({ ...editedMonster, [name]: value });
  };

  const handleStrongChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setEditedMonster({ ...editedMonster, strong: [...editedMonster.strong, value] });
    } else {
      setEditedMonster({ ...editedMonster, strong: editedMonster.strong.filter(item => item !== value) });
    }
  };

  const handleWeakChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setEditedMonster({ ...editedMonster, weak: [...editedMonster.weak, value] });
    } else {
      setEditedMonster({ ...editedMonster, weak: editedMonster.weak.filter(item => item !== value) });
    }
  };

  const handleSubmit = () => {
    handleUpdate(editedMonster);
    handleClose();
  };

  if (!monster) {
    return null;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <h2>Editar Monstruo</h2>
        <TextField
          label="Nombre"
          name="nombre"
          value={editedMonster.nombre || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nivel"
          name="level"
          value={editedMonster.level || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Drops"
          name="drops"
          value={editedMonster.drops || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div className="checkbox-container">
          <span>Resistencias: </span>
          {["Fuego", "Agua", "Rayo", "Hielo", "Viento", "Oscuridad", "Sagrado"].map((elemento, index) => (
            <label key={index} className={`checkbox-label ${elemento.toLowerCase()}`}>
              <input
                type="checkbox"
                value={elemento}
                checked={editedMonster.strong?.includes(elemento) || false}
                onChange={handleStrongChange}
              />
              <span>{elemento}</span>
            </label>
          ))}
        </div>
        <div className="checkbox-container">
          <span>Debilidades: </span>
          {["Fuego", "Agua", "Rayo", "Hielo", "Viento", "Oscuridad", "Sagrado"].map((elemento, index) => (
            <label key={index} className={`checkbox-label ${elemento.toLowerCase()}`}>
              <input
                type="checkbox"
                value={elemento}
                checked={editedMonster.weak?.includes(elemento) || false}
                onChange={handleWeakChange}
              />
              <span>{elemento}</span>
            </label>
          ))}
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={handleClose} color="secondary" sx={{ marginRight: 1 }}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  color: 'black',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default MonsterEditModal;