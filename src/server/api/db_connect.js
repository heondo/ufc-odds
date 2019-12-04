const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
const { Client } = require('pg');
const client = new Client();
// client.connect();

module.exports = client;
