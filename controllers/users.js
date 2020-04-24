const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const _ = require('lodash');

router.get('/', async (req, res) => {
    const users = await User.find().sort('email');
    res.send(users);
});

router.post('/', async(req, res)=>{
    const { error } = validateUser(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // let user = new User({firstName: req.body.firstName, middleName: req.body.middleName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});
    let user = new User(_.pick(req.body, ['firstName','middleName','lastName', 'email', 'password']));
    await user.save();

    res.send(user);

});

module.exports = router;