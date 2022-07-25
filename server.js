const express = require("express");
const path = require("path");

const app = express();
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
  res.status(200).json(`${req.method} request received`);
  console.info(`${req.method} request received`);
});
