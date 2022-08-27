const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// ROUTE - 1 : get all notes for loged in user "/api/notes/allnotes"  . Login required
try {


  router.get('/allnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  })
} catch (error) {
  console.error(error.message)
  res.status(500).send("Some Internal error occured")
}


// ROUTE - 2 : Make a new note "/api/notes/addnotes"  . Login required
try {
  router.post('/addnotes', fetchuser, [
    body('title', 'Enter valid Title').isLength({ min: 3 }),
    body('description', 'Minimun length of description atleast 5 characters').isLength({ min: 5 }),   //validation for not putting empty notes
  ], async (req, res) => {
    const { title, description, tag } = req.body
    // If errors are present .send Bad Req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({ title, description, tag, user: req.user.id })
    const savednote = await note.save()
    res.json(savednote)
  })
} catch (error) {
  console.error(error.message)
  res.status(500).send("Some Internal error occured")
}


// ROUTE - 3 : Update an existing note - PUT "/api/notes/updatenote/:id"  . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body
    // Create a newNote object
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id)                  // checking through ID if note exists (id is specified in path)
    if (!note) { res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user.id) { res.status(401).send("Not Allowed") }        // checking if a user is trying to access another users note

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Internal error occured")
  }
})

// ROUTE - 4 : Delete an existing note using - DELETE "/api/notes/deletenote/:id"  . Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id)                  // checking through ID if note exists (id is specified in path)
    if (!note) { res.status(404).send("Not Found") }

    // Allow delete only if user owns this note
    if (note.user.toString() !== req.user.id) { res.status(401).send("Not Allowed") }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ 'Success': "Note Deleted", "note": note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Internal error occured")
  }
})

module.exports = router