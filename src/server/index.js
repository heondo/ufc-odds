const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const { competitionsJob, summariesJob, seasonsJob } = require('./api/sr-data/cron-jobs');
const seasonsRoute = require('./api/routes/seasons');
const usersRoute = require('./api/routes/users');

const app = express();

app.use('/api/users', usersRoute);
app.use('/api/seasons', seasonsRoute);

app.use((err, req, res, next) => {
  res.send({
    error: err.error,
    message: err.message
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
