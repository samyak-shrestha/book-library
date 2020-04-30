const { Book, validateBook } = require('../models/book');
const { Genre } = require('../models/genre');
const { Author } = require('../models/author');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.find().sort('title');
    res.send(books);
});

router.post('/', async (req, res)=> {
    const { error } = validateBook(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invlid GenreId');

    const author = await Author.findById(req.body.authorId);
    if(!author) return res.status(400).send('Invlid authorId');

    const book = new Book({
        title: req.body.title,
        genre: {
            _id: genre._id,
            title: genre.title
        },
        author: {
            _id: author._id,
            title: author.title
        },
        isbn: req.body.isbn
    })

    await book.save();

    res.send(book);
});

router.get('/:id',async (req, res) => {
    const book = await Book.findById(req.params.id);
    
    if(!book) return res.status(404).send('The movie with given ID was not found');

    res.send(book);
});



router.put('/:id', async(req, res)=>{
    const { error } = validateBook(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invlid GenreId');

    const author = await Author.findById(req.body.authorId);
    if(!author) return res.status(400).send('Invlid authorId');

    const book = await Book.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                title: genre.title
            },
            author: {
                _id: author._id,
                title: author.title
            },
            isbn: req.body.isbn
        }, {new : true});

    if(!book) return res.status(404).send('Book with given Id was not found');

    res.send(book);

});

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    
    if(!book) return res.status(404).send('the book with the given id was not found');

    res.send(book);

});

module.exports = router;