const express = require('express');
const router = express.Router();
const client = require('../db_connect');
const checkAuth = require('../middleware/check-auth');

router.use(express.json());

router.post('/reorder', checkAuth, async (req, res, next) => {
  try {
    const userData = req.userData;
    if (userData.userID !== 35) {
      res.status(404);
      throw new Error("I'm afraid I can't let you do that Stan Marsh, I'm going to have to put you in the game grid.")
    }
    const { seasonID, newOrder } = req.body;
    if (!seasonID || !newOrder) {
      res.status(404);
      throw new Error('invalid_inputs')
    }
    const reorderQuery = {
      name: `reorder-${seasonID}`,
      text: 'update summaries set s_order = (case',
      values: []
    };
    let updateStatusText = ' sport_event_status = (case';
    // id=$1 newOrder. then $2 newOrder.sortOrder) where season_id = seasonID
    let preparedValueIndex = 1;
    newOrder.forEach((s, i) => {
      reorderQuery.text += ` when id=$${preparedValueIndex++} then cast($${preparedValueIndex++} as int)`;
      updateStatusText += ` when id=$${preparedValueIndex++} then cast($${preparedValueIndex++} as json)`;
      reorderQuery.values.push(s.sportEventID, s.sortOrder, s.sportEventID, s.sportEventStatus);
      if (i === newOrder.length - 1) {
        reorderQuery.text += ' end), ';
        updateStatusText += ' end) ';
      }
    });
    reorderQuery.text += ` ${updateStatusText} where seasons_id = $${preparedValueIndex++}`;
    reorderQuery.values.push(seasonID);
    const reorderResponse = await client.query(reorderQuery);
    res.status(200);
    res.json({
      success: true,
      message: `Summaries for ${seasonID} were changed`
    });
  } catch (err) {
    if (!res.statusCode) {
      res.status(500)
    }
    next(err);
  }
});

router.post('/predict', checkAuth, async (req, res, next) => {
  const {seasonID, summaryID, fighterID } = req.body;
  const {userID} = req.userData;
  try {
    if (!seasonID || !summaryID || !fighterID) {
      res.status(404);
      return next({
        error: 'invalid_inputs',
        message: 'Missing a season ID, summary ID, or fighter ID to predict on'
      })
    }
    await client.query("BEGIN")
    const insertPredictionQuery = {
      name: `predict-${fighterID}`,
      text: 'insert into predictions(user_id, seasons_id, summary_id, fighter_id, placed_date) VALUES ($1, $2, $3, $4, now()) on conflict (summary_id, user_id) do update set fighter_id = $5 returning id',
      values: [userID, seasonID, summaryID, fighterID, fighterID]
    }
    const insertResponse = await client.query(insertPredictionQuery);
    const getDateQuery = {
      name: 'get-date',
      text: "SELECT sport_event::json->>'start_time' as startTime, cast(now() as varchar) as currentTime from summaries where id=$1 and seasons_id=$2",
      values:[summaryID, seasonID]
    }
    const getStartDate = await client.query(getDateQuery);
    if (new Date(getStartDate.rows[0].starttime) - new Date(getStartDate.rows[0].currenttime) < 86400000) {
      throw new Error('too_late')
    }
    await client.query('COMMIT')
    res.status(200);
    res.json({
      success: true,
      message: `Prediction placed with ID: ${insertResponse.rows[0].id} for fight ${summaryID}`,
      id: insertResponse.rows[0].id
    })
  } catch (err) {
    await client.query("ROLLBACK")
    res.status(500);
    next(err)
  }
})

module.exports = router;
