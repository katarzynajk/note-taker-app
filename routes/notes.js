const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../utils/fs");
const { v4: uuidv4 } = require("uuid");

//const { readFromFile, readAndAppend, writeToFile } = require("../db/db.json");

// [GET] find all notes
notes.get("/", (req, res) => {
  try {
    readFromFile("." + process.env.FILE).then((data) =>
      res.status(200).json(JSON.parse(data))
    );
  } catch (err) {
    console.log("Error Caught: ", err);
  }
});

// [POST] create note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "." + process.env.FILE);
    res.status(200).json(newNote);
  } else {
    res.error("Error in adding note");
  }
});

// [DELETE] delete note
notes.delete("/:id", (req, res) => {
  const hasParam = Object.keys(req.params).length > 0;

  if (hasParam && req.params.id !== "") {
    const data = require(".." + process.env.FILE);
    for (let [i, e] of data.entries())
      if (e.id === req.params.id) data.splice(i, 1);
    writeToFile("." + process.env.FILE, JSON.parse(JSON.stringify(data)));
    res.status(200).json(req.params);
  } else {
    res.error("Error in deleting note");
  }
});

module.exports = notes;
