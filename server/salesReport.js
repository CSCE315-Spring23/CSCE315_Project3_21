const pool = require("./DB");

const padInt = (num) => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

const getKey = (item1, item2) => {
  let key1 = item1.menuitem_key;
  let key2 = item2.menuitem_key;

  if (key1.localeCompare(key2) < 0) {
    return key1 + "_" + key2;
  }
  return key2 + "_" + key1;
};

/**
 * The request body should be an object with the following properties:
 *
 * {
 *  start: int, // 0-23
 *  end: int, // 0-23
 *  salesWith: "menu_item_id" , //optional (default null)
 *  limit: int //optional number of results to return (default 100)
 * }
 */

const getsalesReport = (request, response) => {
  const start = request.query.start;
  const end = request.query.end;
  const limit = request.query.limit || 100;
  const salesWith = request.salesWith;

  if (!start || !end) {
    response.status(400).json({ error: "start and end are required" });
    return;
  }
  //build the query

  
    let query = "SELECT * from relationship_ordertomenu where order_key in (SELECT id FROM order_table WHERE ordertimestamp >= '";
    query += start;
    query += "AND ordertimestamp <= '";
    query += end;
    query += "');";

  


  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    let rows = results.rows;

    //sort the orders based on the order key
    rows.sort((a, b) => {
      return a.order_key - b.order_key;
    });
    let pairs = {};

    for (let i = 0; i < rows.length; i++) {
      for (let j = i + 1; j < rows.length; j++) {
        if (rows[i].order_key != rows[j].order_key) {
          break;
        }

        let key = getKey(rows[i], rows[j]);

        if (pairs[key]) {
          pairs[key][0]++;
        } else {
          pairs[key] = [1, rows[i], rows[j]];
        }
      }

      //skip tthe order with the same key
      while (
        i < rows.length - 1 &&
        rows[i].order_key == rows[i + 1].order_key
      ) {
        i++;
      }
    }

    //sort the pairs
    let sortedPairs = Object.keys(pairs).sort((a, b) => {
      return pairs[b][0] - pairs[a][0];
    });

    //limit the results
    sortedPairs = sortedPairs.slice(0, limit);

    let finalPairs = [];
    for (let i = 0; i < sortedPairs.length; i++) {
      let pair = pairs[sortedPairs[i]];

      finalPairs.push({
        count: pair[0],
        item1: pair[1].menuitem_key,
        item2: pair[2].menuitem_key,
      });
    }

    response.status(200).json(rows);
  });
};

module.exports = getsalesReport;
