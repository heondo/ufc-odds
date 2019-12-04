const express = require('express');
const router = express.Router();
const client = require('../db_connect');
const bcrypt = require('bcryptjs');
// client.connect();

router.use(express.json());

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const signUpQuery = {
      name: 'add-user',
      text: 'insert into users (username, password, date_joined) VALUES ($1, $2, now()) returning id',
      values: [username, hashPassword]
    };
    const queryData = await client.query(signUpQuery);
    res.status(200);
    res.json({
      success: true,
      userID: queryData.rows[0].id
    });
  } catch (err) {
    // console.log(err);
    if (err.constraint && err.constraint === 'users_username_key') {
      res.status(404);
      return next({
        error: 'duplicate_username',
        message: `Username of ${username} is unavailable`
      });
    }
    res.status(500);
    return next(err);
  }
});

module.exports = router;
