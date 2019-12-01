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

const createPreparedStatements = (table, data, index) => {
  let prepareIndexer = 1;
  const query = {
    name: `add-${table}-${index}`,
    // will have to grab the sport event id in the data.forEach below
    text: `INSERT INTO ${table}(`,
    values: []
  };
  if (!data.length) {
    throw new Error('No data');
  }
  // create which values to insert
  // if the returned data is... fights. It doesnt have the summary id so that has to be inserted? in side each dataObjcts sport_event.id;
  if (table === 'summaries') {
    data[0].id = data[0].sport_event.id || null;
    data[0].seasons_id = data[0].sport_event.sport_event_context.season.id || null;
    data[0].sport_event = data[0].sport_event || null;
    data[0].sport_event_status = data[0].sport_event_status || null;
    data[0].statistics = data[0].statistics || null;
  }
  Object.keys(data[0]).sort().forEach((key, i, arr) => {
    query.text += (i === arr.length - 1) ? `${key}) VALUES` : `${key}, `;
  });
  // columns are created. then for each piece of the data, insert the values....
  data.forEach((dataObject, i, arr) => {
    // then for each value in the object add ? and the value
    if (table === 'competitions') {
      dataObject.parent_id = dataObject.parent_id || null;
    }
    if (table === 'summaries') {
      dataObject.id = dataObject.sport_event.id || null;
      dataObject.seasons_id = dataObject.sport_event.sport_event_context.season.id || null;
      dataObject.sport_event = JSON.stringify(dataObject.sport_event) || null;
      dataObject.sport_event_status = JSON.stringify(dataObject.sport_event_status) || null;
      dataObject.statistics = JSON.stringify(dataObject.statistics) || null;
    }
    Object.keys(dataObject).sort().forEach((key, j, arr2) => {
      if (!j) {
        query.text += `(`;
      }
      query.text += (j === arr2.length - 1) ? `$${prepareIndexer++}),` : `$${prepareIndexer++},`;
      query.values.push(dataObject[key]);
    });
  });
  query.text = query.text.substring(0, query.text.length - 1);
  query.text += ` ON CONFLICT (id) DO UPDATE set `;
  Object.keys(data[0]).sort().forEach((key, i, arr) => {
    query.text += (i === arr.length - 1) ? `${key} = EXCLUDED.${key}` : `${key} = EXCLUDED.${key}, `;
  });
  return query;
};

const fetchInsert = async (url, index) => {
  try {
    const res = await fetch(url);
    if (res.error) {
      throw new Error(res.error);
    }
    const json = await res.json();

    let pgQuery;
    if (json.competitions) { // fight nights, PPV events, single nights essentially. Some Dana white contender series. etc.
      json.competitions = json.competitions.filter(c => c.name.search(/dana.white/i) === -1);
      pgQuery = createPreparedStatements('competitions', json.competitions, index);
    } else if (json.seasons) { // seasons means fights the night of the card (competition)
      pgQuery = createPreparedStatements('seasons', json.seasons, index);
    } else if (json.summaries) { // fight summaries with lots of reptitive info but idk how else to get it.
      pgQuery = createPreparedStatements('summaries', json.summaries, index);
    }
    insertQuery(pgQuery);
  } catch (err) {
    console.error(err);
  }

};

module.exports = fetchInsert;
