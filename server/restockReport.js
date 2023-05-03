const pool = require("./DB");
/**
     * Queries the database to generate a restock report
     * @param {request} 
     * @param {response}
     * @returns results
     */
const getRestockReport = (request, response) => {
    pool.query('SELECT * FROM inventory_item', (error, results) => {
        if (error) {
          throw error;
        }
        let rows = results.rows;
        let res = [];
        //console.log(rows);
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].currentquantity < rows[i].maxquantity * 0.25)
            res.push({
                itemname: rows[i].itemname,
                currentquantity: rows[i].currentquantity,
                minquantity: rows[i].maxquantity * 0.25
            });
        }
        response.status(200).json(res);
    });

}

module.exports = getRestockReport;
