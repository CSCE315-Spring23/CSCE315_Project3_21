const pool = require("./DB");

const getXreport = async (request, response) => {
    // Query enerate the total sales since the last generated Z Report
    let t = Date.now();
    let totSales = 0;
    let num_orders = 0;
    
    let pricequery = `SELECT SUM(totalprice) FROM ordertable_test WHERE ordertimestamp >= (SELECT MAX(daysumm_timestamp) FROM day_summary) AND ordertimestamp <= to_timestamp(${t}/1000.0)`;
    await pool.query(pricequery, (error, results) => {
        if (error) {
            throw error;
        }
        totSales = results.rows[0].sum;
    });
    console.log("X Report Total Sales: ", totSales);

    let numOrderQuery = `SELECT SUM(totalprice) FROM ordertable_test WHERE ordertimestamp >= (SELECT MAX(daysumm_timestamp) FROM day_summary) AND ordertimestamp <= to_timestamp(${t}/1000.0)`;
    await pool.query(numOrderQuery, (error, results) => {
        if (error) {
            throw error;
        }
        num_orders = results.rows[0].count;
    });
    console.log("X Report Total Orders: ", num_orders);
    response.status(200).json(totSales);
}

module.exports = getXreport;