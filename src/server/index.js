const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fetchInsert = require('./api/sr-data/fetch-insert');

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

// probably more essential data like jobs to get latest competitions data, get seasons. Then another job to get summaries based off of
// const job = new CronJob('* 10 * * * *', () => {
//   fetchingData(`https://api.sportradar.us/ufc/trial/v2/en/seasons/sr:season:55173/summaries.json?api_key=${process.env.SR_UFC_KEY}`);
// });

fetchInsert(`https://api.sportradar.us/ufc/trial/v2/en/competitions.json?api_key=${process.env.SR_UFC_KEY}`);

server.listen(port, () => {
  console.log('listening on port ' + port);
});
