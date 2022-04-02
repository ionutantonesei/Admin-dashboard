const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/post');
const PORT = 3000;
const cors = require('cors');
const { db } = require('./models/post');
require('dotenv').config();

mongoose.connect(process.env.DBURL,{useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{console.log('Este conectat!')}).catch((err)=>{console.log(err)});

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/index',(req,res)=>{
    res.render('index');
})

app.get('/admin',(req,res)=>{
    res.render('admin');
})


app.get('/adauga-test',(req,res)=>{
    const intrebareTest = new Post({
    intrebare : 'Cat face 2+2?',
    raspunsuri : [['2' , 0],['4',1],['10',0],['0',0]]});
    intrebareTest.save().then((result)=>{res.send(result)}).catch((err)=>{console.log(err)})
});

app.get('/toate',(req,res)=>{
    Post.find().then((data)=>{res.send(data)}).catch((err)=>{console.log(err)})
})

app.post('/intrebari-lista',(req,res)=>{
    const intrebare1 = new Post({
        intrebare:req.body.intrebare,
        raspunsuri:[[req.body.raspuns1,req.body.raspunsCorect1],[req.body.raspuns2,req.body.raspunsCorect2],[req.body.raspuns3,req.body.raspunsCorect3],[req.body.raspuns4,req.body.raspunsCorect4]]
    })
    intrebare1.save();
    res.render('confirmare');
})

app.get('/sterge-test',(req,res)=>{
    //db.collection('posts').deleteOne({"intrebare":{$eq: req.body.intrebareSterge}}).then(res.render('confirmare'));
    //db.collection('posts').deleteOne().then(res.render('confirmare'));
})

app.listen(PORT, function(err){ 
    if (err) console.log("Error in server setup") 
    console.log("Server listening on Port", PORT);
})
