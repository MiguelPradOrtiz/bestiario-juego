const { Router } = require('express')
const router = Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const filePath = path.join(__dirname, '../sampleMonster.json');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../Imagenes/Castlevania'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage });

const readMonsters = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const writeMonster = (monster) => {
    fs.writeFileSync(filePath, JSON.stringify(monster, null, 2), 'utf-8');
};

router.get('/', (req, res) => {
    const monsters = readMonsters();
    res.json(monsters)
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const monsters = readMonsters();
    const monster = monsters.find(monster => monster.id === id);

    if (monster) {
        res.json(monster);
    } else {
        res.status(404).json({ message: 'Monstruo no encontrado' });
    }
});

router.put('/:id', upload.single('imagen'), (req, res) => {
    const id = parseInt(req.params.id);
    const monsters = readMonsters();
    const index = monsters.findIndex(monster => monster.id === id);

    if (index !== -1) {
        const updatedMonster = {
            ...monsters[index],
            ...req.body,
            strong: typeof req.body.strong === 'string' ? req.body.strong.split(',').map(s => s.trim()) : req.body.strong,
            weak: typeof req.body.weak === 'string' ? req.body.weak.split(',').map(s => s.trim()) : req.body.weak,
        };

        if (req.file) {
            updatedMonster.url_imagen = `https://bestiario-juego.onrender.com/imagenes/Castlevania/${req.file.filename}`;
        }

        monsters[index] = updatedMonster;
        writeMonster(monsters);

        res.json(updatedMonster);
    } else {
        res.status(404).json({ message: 'Monstruo no encontrado' });
    }
});

router.post('/', upload.single('imagen'), (req, res) => {
    const newMonster = req.body;
    const monsters = readMonsters();

    newMonster.id = monsters.length ? monsters[monsters.length - 1].id + 1 : 1;

    if(typeof newMonster.strong === 'string'){
        newMonster.strong = newMonster.strong.split(',').map(s => s.trim());
    }

    if(typeof newMonster.weak === 'string'){
        newMonster.weak = newMonster.weak.split(',').map(s => s.trim());
    }

    if(req.file){
        newMonster.url_imagen = `http://localhost:3000/imagenes/Castlevania/${req.file.filename}`;
    }

    monsters.push(newMonster);
    writeMonster(monsters)

    res.json(newMonster);
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let monsters = readMonsters();

    // Encontrar el índice del monstruo con el ID proporcionado
    const index = monsters.findIndex(monster => monster.id === id);

    if (index !== -1) {
        // Eliminar el monstruo del array
        monsters.splice(index, 1);
        // Guardar los cambios en el archivo JSON
        writeMonster(monsters);
        res.json({ message: 'Monstruo eliminado con éxito' });
    } else {
        res.status(404).json({ message: 'Monstruo no encontrado' });
    }
});

module.exports = router;