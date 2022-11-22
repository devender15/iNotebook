const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const {body, validationResult} = require('express-validator');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occured !");
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
], async (req, res)=>{

    try {
        const {title, description, tag} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
    
        const saved_note = await note.save();
        res.json(saved_note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occured !");
    }
})


// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{

    try {
        const {title, description, tag} = req.body;
        // create a new note object
        const new_note = {};
        if(title){new_note.title = title};
        if(description){new_note.description = description};
        if(tag){new_note.tag = tag};

        // Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).send("Not Found !");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed !");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: new_note}, {new:true});
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occured !");
    }
})


// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try {

        // Find the note to be delted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).send("Not Found !");
        }
    
        // Allow deletion only if user owns this note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed !");
        }
    
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({'Success': 'Note has been deleted', note: note});
    }
    
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occured !");
    }
})

module.exports = router;