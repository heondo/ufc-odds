const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookies = require('cookie-parser');
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
const { getInsertSeasons, getInsertSummaries, getInsertProbabilities } = require('./api/sr-data/get-summ-seas');
// const fetchInsert = require('./api/sr-data/fetch-insert')

const { competitionsJob, summariesJob, seasonsJob, probabilitiesJob } = require('./api/sr-data/cron-jobs');
const seasonsRoute = require('./api/routes/seasons');
const usersRoute = require('./api/routes/users');
const summariesRoute = require('./api/routes/summaries');

const app = express();

app.use(cookies());

app.use('/api/users', usersRoute);
app.use('/api/seasons', seasonsRoute);
app.use('/api/summaries', summariesRoute);

app.use((err, req, res) => {
  console.log(err);
  res.send({
    error: err.error,
    message: err.message
  });
});

competitionsJob.start();
summariesJob.start();
seasonsJob.start();
probabilitiesJob.start();

const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('listening on port ' + port);
});
