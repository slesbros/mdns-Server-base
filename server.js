const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send('hello')
});

app.get("/html", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});