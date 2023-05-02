const pool = require("./DB");

/**
 * Generates the X Report information by making DB queries. Stores the 
 * information in an array and sends it as a json response.
 * @param {*} request 
 * @param {*} response 
 */
const getXreport = async (request, response) => {
    let t = Date.now();
    let totSales = 0;
    let num_orders = 0;
    let t2 = new Date();
    
    // Query the total sales since last generated Z Report
    let pricequery = `SELECT SUM(totalprice) FROM ordertable_test WHERE ordertimestamp >= (SELECT MAX(daysumm_timestamp) FROM day_summary) AND ordertimestamp <= to_timestamp(${t}/1000.0)`;
    let results = await pool.query(pricequery);
    totSales += results.rows[0].sum;
    
    // Query the number of orders since last Z report
    let numOrderQuery = `SELECT COUNT(totalprice) FROM ordertable_test WHERE ordertimestamp >= (SELECT MAX(daysumm_timestamp) FROM day_summary) AND ordertimestamp <= to_timestamp(${t}/1000.0)`;
    results = await pool.query(numOrderQuery);
    num_orders += parseInt(results.rows[0].count);

    console.log("Date: ", t2, "\nTotal Sales: ",totSales, "\n# of Orders: ",num_orders);

    const responseArr = [];
    responseArr.push({'datetime' : t2,'totalSales' : totSales, 'numOrders' : num_orders});
    response.status(200).json(responseArr);
}

module.exports = getXreport;