const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using : GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new note using : POST "api/notes/addnotes"
router.post("/addnote", fetchuser,[
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //returing BAD REQUEST if there is an error
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update an existing Note : PUT "api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //Creating a note obj
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find a note to be updated
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updateNotes = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ updateNotes });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  }
);

//ROUTE 4: Delete an existing Note : DELETE "api/notes/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find a note to be deleted
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Delete if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: deleteNote });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
