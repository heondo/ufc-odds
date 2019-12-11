const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const client = require('../db_connect');
client.connect();

router.use(express.json());

router.get('/:id', async (req, res, next) => {
  try {
    const seasonID = req.params.id;
    const { token } = req.cookies;
    const userData = token ? await jwt.verify(token, process.env.JWT_KEY) : null;
    const getSeasonQuery = {
      name: `get-season`,
      text: 'select summ.*, preds.vote_count voteCount from summaries as summ left join (with main as (select summary_id, fighter_id, count(*) as vote_count from predictions group by summary_id, fighter_id) select summary_id, json_object_agg(fighter_id, vote_count) as vote_count from main group by summary_id) as preds on preds.summary_id = summ.id where summ.seasons_id = $1 order by summ.s_order',
      values: []
    };
    if (userData) {
      getSeasonQuery.name += '-cookies'
      getSeasonQuery.text = "select summ.*, pred.id as prediction_id, pred.fighter_id as predicted_fighter, pred.user_id as user_id, preds.vote_count voteCount from summaries as summ left join (select * from predictions where seasons_id=$1 and user_id=$2) as pred on pred.summary_id = summ.id left join (with main as (select summary_id, fighter_id, count(*) as vote_count from predictions group by summary_id, fighter_id) select summary_id, json_object_agg(fighter_id, vote_count) as vote_count from main group by summary_id) as preds on preds.summary_id = summ.id where summ.seasons_id = $3 order by summ.s_order";
      getSeasonQuery.values.push(seasonID, userData.userID, seasonID);
    } else {
      getSeasonQuery.values.push(seasonID)
    }
    const queryResponse = await client.query(getSeasonQuery)
    if (!queryResponse.rowCount) {
      res.status(403);
      throw new Error('No data available')
    }
    res.status(200);
    res.json({
      success: true,
      summaries: queryResponse.rows
    });
  } catch (err) {
    if (!res.statusCode)  {
      res.status(500);
    }
    next(err)
  }
});

router.get('/', (req, res, next) => {
  const getSeasonsQuery = {
    name: 'get-seasons',
    text: "select sn.id, sn.name, sn.start_date, sm.five_round_events from seasons as sn left join ( select sm.seasons_id, json_agg(json_build_object('id', sm.id, 'sport_event', sm.sport_event, 'match_status', sm.match_status) order by sm.s_order) as five_round_events from ( select id, seasons_id, sport_event, s_order, sport_event_status:: json ->> 'scheduled_length' st, sport_event_status::json->>'match_status' match_status from summaries) as sm where sm.st = '5' and sm.seasons_id is not null group by sm.seasons_id ) as sm on sm.seasons_id = sn.id order by sn.start_date desc limit 30"
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
