const express = require('express'); // import express
const app = express();  // create express app

app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.get('/:name', (req, res) => {
      const {name}   = req.params;
      res.send(`Hello ${name}!`);
    });

module.exports = app; // export the app