/**
 * Project: Simple Blog Website
 * Description:Simple Blog Website for (Interview Test Project)
 */

// * Importing packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
//Importing Enviroment Variables
require('dotenv').config();
app.use(cors());

let PORT = process.env.PORT || 8080;

app.use(compression()); //Compress all routes
app.use(helmet()); // Will protect from known vulnerabilities

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

//* Importing Routes
app.use('/images', express.static(__dirname + '/images'));
const postRoute = require('./routes/posts.route');
app.use(postRoute);

// * Initialize mongoose and start service
mongoose
  .connect(
    'mongodb+srv://hanish:3LWjfW78hUrAs8U@readcountsystem.ynftu.mongodb.net/pratilipi?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
