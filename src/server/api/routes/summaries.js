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
      return next({
        error: 'falied_creds',
        message: 'could not reorder summaries'
      });
    }
    const { seasonID, newOrder } = req.body;
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
    return next(err);
  }
  // res.json({ success: true });
});

module.exports = router;
