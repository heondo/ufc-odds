const express = require('express');
const router = express.Router();
const client = require('../db_connect');
client.connect();

router.use(express.json());

router.get('/:id', (req, res, next) => {
  const seasonID = req.params.id;
  const getSeasonQuery = {
    name: 'get-season',
    text: 'select * from summaries where seasons_id = $1 order by s_order',
    values: [seasonID]
  };
  client.query(getSeasonQuery, (err, seasonData) => {
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
    // seasonData.rows.sort((a, b) => a.sport_event_status.match_status === 'cancelled' ? 1 : -1);
    res.status(200);
    res.json({
      success: true,
      summaries: seasonData.rows
    });
  });
});

router.get('/', (req, res, next) => {
  const getSeasonsQuery = {
    name: 'get-seasons',
    text: "select sn.id, sn.name, sn.start_date, sm.five_round_events from seasons as sn left join ( select sm.seasons_id, json_agg(json_build_object('id', sm.id, 'sport_event', sm.sport_event, 'match_status', sm.match_status)) as five_round_events from ( select id, seasons_id, sport_event, sport_event_status:: json ->> 'scheduled_length' st, sport_event_status::json->>'match_status' match_status from summaries ) as sm where sm.st = '5' and sm.seasons_id is not null group by sm.seasons_id ) as sm on sm.seasons_id = sn.id order by sn.start_date desc limit 30"
  };
  client.query(getSeasonsQuery, (err, seasons) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!seasons.rowCount) {
      res.status(403);
      return next({
        message: 'No data available'
      });
    }
    res.status(200);
    res.json({
      success: true,
      seasons: seasons.rows
    });
  });
});

module.exports = router;
