const fetch = require('node-fetch');
const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') });
const client = new Client();
client.connect();

async function insertQuery(query) {
  try {
    let res;
    res = await client.query(query);
    return res;
  } catch (err) {
    console.error(err);
  }
}

const createPreparedStatements = (table, data) => {
  let prepareIndexer = 1;
  const query = {
    name: `add-${table}`,
    // will have to grab the sport event id in the data.forEach below
    text: (table === 'summaries') ? `INSERT INTO ${table}(id, ` : `INSERT INTO ${table}(`,
    values: []
  };
  if (!data.length) {
    throw new Error('No data');
  }
  // create which values to insert
  // if the returned data is... fights. It doesnt have the summary id so that has to be inserted? in side each dataObjcts sport_event.id;
  Object.keys(data[0]).forEach((key, i, arr) => {
    query.text += (i === arr.length - 1) ? `${key}) VALUES` : `${key}, `;
  });
  // columns are created. then for each piece of the data, insert the values....
  data.forEach((dataObject, i, arr) => {
    // then for each value in the object add ? and the value
    //
    if (table === 'competitions') {
      dataObject.parent_id = dataObject.parent_id || null;
    }
    Object.values(dataObject).forEach((val, i, arr) => {
      if (!i) {
        query.text += (table === 'summaries') ? `($${prepareIndexer++},` : `(`;
        if (table === 'summaries') {
          query.values.push(dataObject.sport_event.id);
        }
      }
      query.text += (i === arr.length - 1) ? `$${prepareIndexer++}),` : `$${prepareIndexer++},`;
      query.values.push(val);
    });
  });
  query.text = query.text.substring(0, query.text.length - 1);
  return query;
};

const fetchInsert = async url => {
  try {
    const res = await fetch(url);
    if (res.error) {
      throw new Error(res.error);
    }
    const json = await res.json();

    // console.log('hello');

    let pgQuery;
    if (json.competitions) { // fight nights, PPV events, single nights essentially. Some Dana white contender series. etc.
      json.competitions = json.competitions.filter(c => c.name.search(/dana.white/i) === -1);
      pgQuery = createPreparedStatements('competitions', json.competitions);
    } else if (json.seasons) { // seasons means fights the night of the card (competition)
      pgQuery = createPreparedStatements('seasons', json.seasons);
    } else if (json.summaries) { // fight summaries with lots of reptitive info but idk how else to get it.
      pgQuery = createPreparedStatements('summaries', json.summaries);
    }
    insertQuery(pgQuery);
    // return json;
  } catch (err) {
    console.error(err);
  }

};

module.exports = fetchInsert;
