const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') });
const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const client = new Client();
client.connect();

router.use(express.json());

router.get('/', (req, res, next) => {
  const getSeasonsQuery = {
    name: 'get-seasons',
    text: 'select * from seasons order by id desc limit 50'
  };
  client.query(getSeasonsQuery, (err, seasonData) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!seasonData.rowCount) {
      res.status(403);
      return next({
        message: 'No data available'
      });
    }
    res.status(200);
    res.json({
      success: true,
      seasons: seasonData.rows
    });
  });
});

module.exports = router;
