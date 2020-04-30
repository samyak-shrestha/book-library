const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const {Genre, validateGenre } = require('../models/genre');

router.get('/', async (req, res) => {
    const gernes = await Genre.find().sort('title');
    res.send(gernes);
});

router.post('/', auth, async (req, res)=>{
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({title: req.body.title});
    genre = await genre.save();

    res.send(genre);
});

router.get('/:id', validateObjectId, async(req, res) =>{
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('Genre with given ID was not found');

    res.send(genre);
});


router.put('/:id',  [auth, validateObjectId], async(req, res) =>{

    const { error } = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { title: req.body.title }, {
        new: true
    });

    if(!genre) return res.status(404).send('Genre with given ID was not found');

    res.send(genre);
});

router.delete('/:id',  [auth, validateObjectId], async(req, res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('Genre with given ID was not found');

    res.send('Genre deleted');
});

module.exports = router;