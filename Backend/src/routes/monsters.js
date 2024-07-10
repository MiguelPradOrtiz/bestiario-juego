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

router.post('/', upload.single('imagen'), (req, res) => {
    const newMonster = req.body;
    const monsters = readMonsters();

    newMonster.id = monsters.length ? monsters[monsters.length - 1].id + 1 : 1;

    if(typeof newMonster.strong === 'string'){
        newMonster.strong = newMonster.strong.split(',').map(s => s.trim());
    }

    if(req.file){
        newMonster.url_imagen = `http://localhost:3000/imagenes/Castlevania/${req.file.filename}`;
    }

    monsters.push(newMonster);
    writeMonster(monsters)

    res.json(newMonster);
})

module.exports = router;