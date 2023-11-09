const express = require('express')
const app = express()
const PORT = 3000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/random-word',function (req,res){
    const words =["Hi","Beans","Three"];
    const word = words[Math.floor(Math.random() * words.length)];
    res.send(word);
})

console.log(`Listening on port: ${PORT}`);
app.listen(3000)