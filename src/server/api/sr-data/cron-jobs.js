const CronJob = require('cron').CronJob;
const dotenv = require('dotenv');
const path = require('path');
const fetchInsert = require('./fetch-insert');
const { getSummaries, getSeasons } = require('./get-summ-seas');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') });

const competitionsJob = new CronJob('00 00 * * Sun', () => {
  fetchInsert(`https://api.sportradar.us/ufc/trial/v2/en/competitions.json?api_key=${process.env.SR_UFC_KEY}`);
}, null, false, 'America/Los_Angeles');

const seasonsJob = new CronJob('05 00 * * Sun', () => {
  getSeasons();
}, null, false, 'America/Los_Angeles');

const summariesJob = new CronJob('10 0 * * 0,3', () => {
  getSummaries();
}, null, false, 'America/Los_Angeles');

module.exports = {
  competitionsJob,
  seasonsJob,
  summariesJob
};
