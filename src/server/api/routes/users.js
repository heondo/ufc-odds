const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') });
const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const client = new Client();
client.connect();

router.use(express.json());

router.post('/signup', (req, res, next) => {

});
