const express = require('express'); // import express

const app = express();  // create express app

const apps= {
    hello: require('./hello.js'),

};

const middlewares = [
    require('./middlewares/worker.js')({logging: true}),
]

app.use(middlewares); // use the worker middleware

// create a route for the app
app.use('/hello', apps.hello); // use the helloApp for the /hello route

app.get('/', (req, res) => {    // create a route for the app
  res.send('Home Sweet Home'); // send a response to the client
});

module.exports = app; // export the app