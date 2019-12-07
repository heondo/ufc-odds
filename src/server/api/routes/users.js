const express = require('express');
const router = express.Router();
const client = require('../db_connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

// client.connect();

router.use(express.json());

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const getUserQuery = {
      name: 'user-login',
      text: 'SELECT * from users where username = $1',
      values: [username]
    };
    const userQueryData = await client.query(getUserQuery);
    if (!userQueryData.rowCount) {
      res.status(404);
      throw new Error('failed_credentials')
    }
    const comparePasswords = await bcrypt.compare(password, userQueryData.rows[0].password);
    if (!comparePasswords) {
      res.status(405);
      throw new Error('failed_credentials')
    }
    const token = await jwt.sign({
      userID: userQueryData.rows[0].id,
      username: username
    }, process.env.JWT_KEY, { expiresIn: '14 days' });
    res.status(200);
    res.cookie('token', token);
    res.json({
      succcess: true,
      userID: userQueryData.rows[0].id,
      username: username
    });
  } catch (err) {
    next(err);
  }
});

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
    const userID = queryData.rows[0].id;
    const token = await jwt.sign({
      userID,
      username: username
    }, process.env.JWT_KEY, { expiresIn: '14 days' });
    res.status(200);
    res.cookie('token', token);
    res.json({
      success: true,
      userID,
      username
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
    next(err);
  }
});

module.exports = router;
