// importation Express
const express = require('express');
const app = express();
app.use(express.json());

//importation dotenv
require('dotenv').config({path: "./config/.env"});

// importation des routes 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');




/*----- Securité -----*/
//contrôle d'accès
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
  });

//connexion à la database
const mongoose = require('mongoose'); 
mongoose.connect(`mongodb+srv://johann:wG2Lj4XD3sDFQBRh@cluster0.gl34dzj.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// router 
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
  
module.exports = app;