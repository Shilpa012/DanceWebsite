const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactDance', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   address: String,
   message: String
});

const Contact = mongoose.model('Contact', contactSchema);


//EXPRES SPECIFIC STUFF
app.use('/static', express.static('static'));//for serving static file
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');//set templete engine for pug
app.set('views', path.join(__dirname, 'views'));//set the views directory using path module

//Endpoints
app.get('/', (req, res) => {
   res.status(200).render('home.pug');
})

const goTo = app.get('/contact', (req, res) => {
   res.status(200).render('contact.pug');
})
app.post('/contact', (req, res) => {
   try{
   var myData = new Contact(req.body)
   myData.save();
    return res.send("This item has been saved to the database");
      
   }
   catch(error){
      res.status(400).end("The item was not saved to the database")
   }
    res.status(200).render('contact.pug')
   
})

app.get('/aboutus', (req, res) => {
   res.status(200).render('about.pug');
})
app.get('/services', (req, res) => {
   res.status(200).render('services.pug');
})
app.listen(port, (req, res) => {
   console.log(`Listening to http://localhost:${port}`);
})
