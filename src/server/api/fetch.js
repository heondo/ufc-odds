const fetch = require('node-fetch');
const express = require('express');
const { Client } = require('pg');
const client = new Client();
client.connect();

// const createPreparedStatements(data, )

const fetchingData = async url => {
//   try {
//     const res = await fetch(url);
//     if (res.error) {
//       throw new Error(res.error);
//     }
//     const json = await res.json();
//     console.log('hello');
//     // const query = (name, text, values) => {
//     //   return {
//     //     name,
//     //     text,
//     //     values
//     //   };
//     // };
//     // if (json.competitions) { // fight nights, PPV events, single nights essentially. Some Dana white contender series. etc.

  //     //   // const compQuery = query('add-comps', 'INSERT INTO competitions(id, name, parent_id) VALUES()');
  //     // } else if (json.seasons) { // seasons means fights the night of the card (competition)

  //     // } else if (json.summaries) { // fight summaries with lots of reptitive info but idk how else to get it.

  //     // }

  //     // do something in this place with the data cause the code in index will run asynchronously right after
  //     // this gets the
  //     // return json;
  //   } catch (err) {
  //     console.error(err);
  //   }

};

module.exports = fetchingData;
