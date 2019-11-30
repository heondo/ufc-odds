const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fetchInsert = require('./fetch-insert');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
const client = new Client();
client.connect();

async function getSeasons() {
  // query data from competitions, like the ten newest ones. Thenn you have
  try {
    const queryResult = await client.query('select * from competitions order by id desc');
    // queryResult.
  } catch (err) {
    console.error(err);
  }

}
