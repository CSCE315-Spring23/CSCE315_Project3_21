const pool = require("./DB");

/**
 * Generates the Z Report information by making DB query for the most recent day summary. Stores the 
 * information in an array and sends it as a json response.
 * @param {*} request 
 * @param {*} response 
 */
const getZReport = (request,response) => {
    let query = "SELECT * from day_summary where daysumm_timestamp = (SELECT max(daysumm_timestamp) from day_summary);"
    pool.query(query,(error,results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getZReport,
};