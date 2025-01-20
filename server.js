const express = require('express');
const cors = require("cors");
const generateQuiz = require('./funcs/generateQuiz');
const app = express();
app.use(cors());
app.use(express.json());
const port = 4800;


app.get('/api/test', (req, res) => {
   res.send("working..!")
});

app.get('/api/getQuiz/:level',(req,res)=>{
    const level = req.params.level;
    let arr = generateQuiz(10,level);
    res.send(arr);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});