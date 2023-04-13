const pool = require("./DB");

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