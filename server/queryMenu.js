const { response } = require("express")
const pool = require("./DB")

const getMenu = async (request, response) => {
    let query = `SELECT * FROM menu_item`
    let results = await pool.query(query);

    //console.log(results.rows)

    let rows = results.rows;
    let res = [];

    for (let i = 0; i < rows.length; i++) {
        res.push({
            itemname: rows[i].itemname,
            price: rows[i].price,
            category: rows[i].category,
            imageLink: rows[i].imagelink
        })
    }
    response.status(200).json(res);
}

module.exports = getMenu;