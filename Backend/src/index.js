const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path');
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// ruta que se usa para tomar imagenes
app.use('/imagenes', express.static(path.join(__dirname, '../Imagenes')));


//routes
app.use(require('./routes/index'))
app.use('/api/movies', require('./routes/movies'))
app.use('/api/monster', require('./routes/monsters'));

//servidor
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`)
})
