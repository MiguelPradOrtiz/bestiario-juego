const { Router } = require("express");
const router = Router();
const _ = require('underscore');


const movies = require('../sample.json');


router.get('/', (req, res) => {
    res.json(movies)
})

router.post('/', (req, res) => {
    const { titulo, director, año, rating } = req.body;
    if(titulo && director && año && rating ){
        const id = movies.length + 1;
        const newMovie = { id, ...req.body}
        movies.push(newMovie);
        res.json(movies)
    }else{
        res.status(500).json({error: 'Hay un error.'})    
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, director, año, rating } = req.body;
    if(titulo && director && año && rating ){
        _.each(movies, (movie, i) => {
            if(movie.id == id){
                movie.titulo = titulo;
                movie.director = director;
                movie.año = año;
                movie.rating = rating;
            }
        })
        res.json(movies)
    }else{
        res.status(500).send({error:"error al actualizar la pelicula"})
    }


});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    _.each(movies, (movie, i) => {
        if(movie.id == id){
            movies.splice(i, 1);
        }
    })
    res.send("eliminado")
})

module.exports = router;