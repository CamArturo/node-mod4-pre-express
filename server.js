const express = require('express');
const app = express();
const path = require('path');
const debug = require('debug')('server');

app.listen(3000, () => {
  debug('express intro running on localhost: 3000');
});

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

// At a high level, app.use() says for every request to the server, always run the function passed into app.use()
// In this case want to say: for every request to the server, make sure to use the specified directory as a starting point for all static asset files.

// app.use(express.static('public'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.use(urlLogger, timeLogger);

app.get('/json', urlLogger, timeLogger, (request, response) => {
  response.status(200).json({'name': 'Robbie'});
});

app.get('/sunsets', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/views/sunsets.html'));
});

app.use(function (request, response, next) {
  response.status(404).sendFile(path.join(__dirname, '/public/views/404.html'));
});