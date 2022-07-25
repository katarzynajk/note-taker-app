const express = require("express");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => res.send("public/index.html"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
