const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/api.js');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


//HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'));
});
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'))
});