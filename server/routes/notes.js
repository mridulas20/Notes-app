const router = require("express").Router();
const Note = require("../models/Note");

// Add note
router.post("/add", async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
});

// Get notes
router.get("/:userId", async (req, res) => {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
});

// Delete
router.delete("/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json("Deleted");
});

module.exports = router;