const express=require('express');

const bodyParser=require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connection with mongo db is established");
});



const FormSchema = new mongoose.Schema({
    id:String,
    first_name: String,
    last_name:String,
    Age:Number,
    email_address:String,
    body_temperature:Number,
  });

const person=mongoose.model('person_data',FormSchema);

const app=express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('static')); 


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post('/',function(req,res){
    const Person=new person({
        id:req.body.id,
        first_name:req.body.firstname,
        last_name:req.body.lastname,
        Age:req.body.age,
        email_address:req.body.email,
        body_temperature:req.body.temperature
    });
    Person.save();
    res.sendFile(__dirname+'/sucess.html');
})


app.listen(3000,function(){
    console.log("server is running at port:3000");
})