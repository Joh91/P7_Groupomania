// importation Express
const express = require('express');
const app = express();
app.use(express.json());

// importation de bodyParser 
const bodyParser = require('body-parser')
app.use(bodyParser.json());

//importation Helmet 
const helmet = require('helmet');
app.use(helmet());

//importation dotenv
require('dotenv').config({path: "./config/.env"});

// importation des routes 
const userRoutes = require('./routes/user.auth');
const userProfile = require('./routes/user.profile');
const posts = require('./routes/posts');

// importation path 
const path = require('path');

// import Cors 
const cors = require('cors'); 
app.use(cors())

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
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gl34dzj.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// router 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/user', userProfile); 
app.use('/api/posts', posts);
  
module.exports = app;