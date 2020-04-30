const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const {Author, validateAuthor } = require('../models/author');

router.get('/', async (req, res) => {
    const gernes = await Author.find().sort('title');
    res.send(gernes);
});

router.post('/', auth, async (req, res)=>{
    const { error } = validateAuthor(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let author = new Author({title: req.body.title});
    author = await author.save();

    res.send(author);
});

router.get('/:id', validateObjectId, async(req, res) =>{
    const author = await Author.findById(req.params.id);

    if(!author) return res.status(404).send('author with given ID was not found');

    res.send(author);
});


router.put('/:id',  [auth, validateObjectId], async(req, res) =>{

    const { error } = validateAuthor(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const author = await Author.findByIdAndUpdate(req.params.id, { title: req.body.title }, {
        new: true
    });

    if(!author) return res.status(404).send('author with given ID was not found');

    res.send(author);
});

router.delete('/:id',  [auth, validateObjectId], async(req, res)=>{
    const author = await Author.findByIdAndRemove(req.params.id);

    if(!author) return res.status(404).send('author with given ID was not found');

    res.send('author deleted');
});

module.exports = router;