const express = require("express");
const words = require("./data/words.json")

const PORT =  process.env.Port|| 3001;

const app = express();

app.get("/api/words", (req, res) => {
    res.json(words);

})

app.listen(PORT)