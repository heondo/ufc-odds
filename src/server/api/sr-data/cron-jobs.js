const CronJob = require('cron').CronJob;
const dotenv = require('dotenv');
const path = require('path');
const fetchInsert = require('./fetch-insert');
const { getInsertSummaries, getInsertSeasons, getInsertProbabilities } = require('./get-summ-seas');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') });

const competitionsJob = new CronJob('00 3 * * Sun', () => {
  fetchInsert(`https://api.sportradar.us/ufc/trial/v2/en/competitions.json?api_key=${process.env.SR_UFC_KEY}`);
}, null, false, 'America/Los_Angeles');

const seasonsJob = new CronJob('12 3 * * 0,3,5', () => {
  getInsertSeasons();
}, null, false, 'America/Los_Angeles');

const summariesJob = new CronJob('24 3 * * 0,3,5', () => {
  getInsertSummaries();
}, null, false, 'America/Los_Angeles');

const probabilitiesJob = new CronJob('36 3 * * 0,3,5' , () => {
  getInsertProbabilities();
}, null, false, 'America/Los_Angeles');

module.exports = {
  competitionsJob,
  seasonsJob,
  summariesJob,
  probabilitiesJob
};
