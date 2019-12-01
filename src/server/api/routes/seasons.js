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
    text: "select sn.id, sn.name, sn.start_date, sm.five_round_events from seasons as sn left join ( select sm.seasons_id, json_agg(json_build_object('id', sm.id, 'sport_event', sm.sport_event)) as five_round_events from ( select id, seasons_id, sport_event, sport_event_status:: json ->> 'scheduled_length' st from summaries ) as sm where sm.st = '5' and sm.seasons_id is not null group by sm.seasons_id ) as sm on sm.seasons_id = sn.id order by sn.start_date desc limit 30"
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
