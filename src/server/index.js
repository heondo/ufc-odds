const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { competitionsJob, summariesJob, seasonsJob } = require('./api/sr-data/cron-jobs');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const app = express();

app.use((err, req, res, next) => {
  res.send({
    type: err.type,
    error: err.message
  });
});

competitionsJob.start();
summariesJob.start();
seasonsJob.start();

const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('listening on port ' + port);
});
