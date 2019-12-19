const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fetchInsert = require('./fetch-insert');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
const client = new Client();
client.connect();

const fetchTimeout = 3000;

async function getInsertSeasons() {
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

async function getInsertSummaries() {
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

async function getInsertProbabilities() {
  try {
    const queryResult = await client.query('select * from seasons order by id limit 10');
    queryResult.rows.forEach((r, i) => {
      const url = `https://api.sportradar.us/ufc/trial/v2/en/seasons/${r.id}/probabilities.json?api_key=${process.env.SR_UFC_KEY}`;
      setTimeout(() => {
        fetchInsert(url, i);
      }, i * fetchTimeout);
    });
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = {
  getInsertSeasons,
  getInsertSummaries,
  getInsertProbabilities
};
