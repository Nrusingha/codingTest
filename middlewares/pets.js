const router = require('express').Router();
const Pet = require('../models/Posts');

router.get('/pets', async (req, res) => {
    const posts = await Pet.find({});
    res.send(posts);
});

router.post('/pet', async (req, res) => {
    const Pet = new Pet();
    Pet.name = req.body.name;
    Pet.age = req.body.age;
    Pet.colour = req.body.colour;
    await Pet.save();
    res.send(Pet);
});

router.get('/pet/:petid', async (req, res) => {
    const Pet = await Pet.findById({ _id: req.params.petid })
    res.send(Pet);
});

router.put('/pet/:petid', async (req, res) => {
    const Pet = await Pet.findByIdAndUpdate({
        _id: req.params.petid
    }, req.body, {
        new: true,
        runValidators: true
    });
    res.send(Pet);
});

router.delete('/pet/:petid', async (req, res) => {
    const Pet = await Pet.findByIdAndRemove({
        _id: req.params.petid
    });
    res.send(Pet);
});

module.exports = router;