const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fetchInsert = require('./fetch-insert');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
const client = new Client();
client.connect();

const fetchTimeout = 1200;

async function getSeasons() {
  try {
    const queryResult = await client.query('select * from competitions order by id desc limit 10');
    queryResult.rows.forEach((r, i) => {
      const url = `https://api.sportradar.us/ufc/trial/v2/en/competitions/${r.id}/seasons.json?api_key=${process.env.SR_UFC_KEY}`;
      setTimeout(() => {
        fetchInsert(url, i);
      }, i * fetchTimeout);
    });
  } catch (err) {
    console.error(err);
  }
}

async function getSummaries() {
  try {
    const queryResult = await client.query('select * from seasons order by id desc limit 10');
    queryResult.rows.forEach((r, i) => {
      const url = `https://api.sportradar.us/ufc/trial/v2/en/seasons/${r.id}/summaries.json?api_key=${process.env.SR_UFC_KEY}`;
      setTimeout(() => {
        fetchInsert(url, i);
      }, i * fetchTimeout);
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getSeasons,
  getSummaries
};
