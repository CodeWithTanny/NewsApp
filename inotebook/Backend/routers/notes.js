const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

//ROUTE 1: Get All the notes using: GET "api/auth/getuser". login required.
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: Add a new note using: POST "api/auth/addnote". login required.
router.post('/addnote', fetchUser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description','description must be atleast 5 charcters').isLength({ min: 5 }),
], async(req, res)=>{
    try {

    const {title, description, tag} = req.body;
// If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");   
}
})

module.exports = router;