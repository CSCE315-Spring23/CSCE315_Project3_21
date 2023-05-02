const pool = require("./DB")

/**
 * Queries all of the menu items from the database and stores their information in an array.
 * The array is sent as a json response.
 * @param {*} request 
 * @param {*} response 
 */
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

/**
 * Queries all of the menu items classified as entrees from the database and stores their information in an array.
 * The array is sent as a json response.
 * @param {*} request 
 * @param {*} response 
 */
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

/**
 * Queries all of the menu items classified as sides from the database and stores their information in an array.
 * The array is sent as a json response.
 * @param {*} request 
 * @param {*} response 
 */
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

/**
 * Queries all of the menu items classified as desserts from the database and stores their information in an array.
 * The array is sent as a json response.
 * @param {*} request 
 * @param {*} response 
 */
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

/**
 * Queries 12 random menu items from the database and stores their information in an array.
 * The array is sent as a json response.
 * @param {*} request 
 * @param {*} response 
 */
const getSomeMenuItems = async(request, response) => {
    let query = "SELECT * FROM menu_item WHERE category IN('entree', 'dessert') order by random() LIMIT 12"
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