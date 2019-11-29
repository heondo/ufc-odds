const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fetchingData = require('./api/fetch');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const app = express();

app.use((err, req, res, next) => {
  res.send({
    type: err.type,
    error: err.message
  });
});

const port = process.env.PORT;
const server = http.createServer(app);

fetchingData(`https://api.sportradar.us/ufc/trial/v2/en/competitions.json?api_key=${process.env.SR_UFC_KEY}`);

server.listen(port, () => {
  console.log('listening on port ' + port);
});
