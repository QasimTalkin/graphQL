// set up express server
const express = require('express');
const app = express();
const port = process.env.PORT || 4014;
const db = require('./config/connection');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', 
  (re, res) => { res.redirect('http://localhost:3000') }
);

// open connection to mongo db, once successful start server
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});