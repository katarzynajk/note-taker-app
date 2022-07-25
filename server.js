const express = require("express");
const path = require("path");
const { readFromFile, readAndAppend } = require("./utils/fs");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.use(express.static("public"));

app.get("/", (req, res) => res.send("public/index.html"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

// [GET] find all notes
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) =>
    res.status(200).json(JSON.parse(data))
  );
  console.info(`${req.method} request received`);
});

// [POST] create note
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.status(200).json(newNote);
  } else {
    res.error("Error in adding note");
  }
  console.info(`${req.method} request received`);
});
