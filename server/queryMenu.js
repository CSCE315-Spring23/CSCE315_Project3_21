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
            price: rows[i].price/ 100.0,
            category: rows[i].category,
            imageLink: rows[i].imagelink
        })
    }
    response.status(200).json(res);
}

const getEntrees = async(request, response) => {
    let query = `SELECT * FROM menu_item WHERE category = 'entree'`
    let results = await pool.query(query);

    let rows = results.rows;
    let res = [];
    
    for (let i = 0; i < rows.length; i++) {
        res.push({
            itemname: rows[i].itemname,
            price: rows[i].price/100.0,
            category: rows[i].category,
            imageLink: rows[i].imagelink
        })
    }
    response.status(200).json(res);
}

const getSides = async(request, response) => {
    let query = `SELECT * FROM menu_item WHERE category = 'side'`
    let results = await pool.query(query);

    let rows = results.rows;
    let res = [];
    
    for (let i = 0; i < rows.length; i++) {
        res.push({
            itemname: rows[i].itemname,
            price: rows[i].price/100.0,
            category: rows[i].category,
            imageLink: rows[i].imagelink
        })
    }
    response.status(200).json(res);
}

const getDesserts = async(request, response) => {
    let query = `SELECT * FROM menu_item WHERE category = 'dessert'`
    let results = await pool.query(query);

    let rows = results.rows;
    let res = [];
    
    for (let i = 0; i < rows.length; i++) {
        res.push({
            itemname: rows[i].itemname,
            price: rows[i].price/100.0,
            category: rows[i].category,
            imageLink: rows[i].imagelink
        })
    }
    response.status(200).json(res);
}

const getSomeMenuItems = async(request, response) => {
    let query = "SELECT * FROM menu_item WHERE category IN('entree', 'dessert') order by random() LIMIT 10"
    let results = await pool.query(query);

    let rows = results.rows;
    let res = [];
    
    for (let i = 0; i < rows.length; i++) {
        res.push({
            itemname: rows[i].itemname,
            price: rows[i].price/100.0,
            category: rows[i].category,
            imageLink: rows[i].imagelink
        })
    }
    response.status(200).json(res);
}
module.exports = {
    getMenu,
    getEntrees,
    getSides,
    getDesserts,
    getSomeMenuItems,
}