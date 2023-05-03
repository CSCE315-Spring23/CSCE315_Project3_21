const pool = require("./DB");


/**
 * 
 *
 * getSalesReport is used to query our database for the sales report with the dates specified
 * @param {request}
 * @param {response}
 * @returns none
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
    query += "' AND ordertimestamp <= '";
    query += end;
    query += "');";


  

  /**
 * 
 * @param {query} 
 * @param {results}
 * pool.query is used here to format the data into rows and columns.
 * @returns {response} 
 */
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    let rows = results.rows;
        let res = [];
        //console.log(rows);
        for (let i = 0; i < rows.length; i++) {
            
            res.push({
                id: rows[i].id,
                order_key: rows[i].order_key,
                menuitem_key: rows[i].menuitem_key,
                quantity: rows[i].quantity,
            });
        }
        response.status(200).json(res);
    });
};

module.exports = getsalesReport;
