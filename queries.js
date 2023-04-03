const pool = require('./DB');

const getEmployees = (request, response) => {
  pool.query('SELECT * FROM employee', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEmployeeByPin = (request, response) => {
  const pin = request.query.pin;

  pool.query('SELECT * FROM employee WHERE pin = $1', [pin], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
/*
const createUser = (request, response) => {
  const { pin, firstname, lastname, manaager } = request.body;

  pool.query(
    'INSERT INTO employee (pin, firstname, lastname, manaager) VALUES ($1, $2, $3, $4) RETURNING *',
    [pin, firstname, lastname, manager],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with pin: ${results.rows[0].pin}`);
    }
  );
};

const updateUser = (request, response) => {
  const pin = parseInt(request.params.pin);
  const { firstname, lastname, manaager } = request.body;

  pool.query(
    'UPDATE employee SET firstname = $1, lastname = $2 WHERE id = $3',
    [firstname, lastname, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const pin = parseInt(request.params.pin);

  pool.query('DELETE FROM employee WHERE pin = $1', [pin], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with pin: ${pin}`);
  });
};
*/

const getInventoryItems = (request, response) => {
  pool.query('SELECT * FROM inventory_item LIMIT 20', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


/**
 * The following could be shifted to a different file.  
 * It creates the backend functionality for the Excess Report. 
 * Without a front end I am not 100% sure of full functionality.
 * individual SQL
 * 
 * The request body should be an object with the following properties:
 *
 * {
 *  start: string, // start timestamp 
 * }
 */

const getExcessReport = (request,response) => {
  const start = request.query.start;
  if(!start){
    response.status(400).json({error: 'Start timestamp not given'});
  }

  /* full SQL command for inventory items (excludes calculation for multiple quantities per order)
  SELECT * from inventory_item where itemname in 
  (select inventoryitemkey from relationship_menutoinventory_unitquantities where menuitemkey in 
    (SELECT menuitem_key from relationship_ordertomenu where order_key in 
      (SELECT id from order_table where ordertimestamp >= '2023-02-28 22:50:00')));
  */

  //send query to get all menuitems and their quantities for anything in the appropriate time range
  let query = "SELECT menuitem_key, quantity from relationship_ordertomenu where order_key in (SELECT id from order_table where ordertimestamp >= '";
  query += start;//"2023-02-28 22:50:00";
  query += "');";
  
    pool.query(query,(error,results) => {
    if(error) {
      throw error;
    }
    let rows = results.rows;
    
    pool.query('SELECT * from inventory_item;',(error,results) => {
          if(error) {
            throw error;
          }

        let rows2 = results.rows;

        let finalPairs = [];

        //put inventory items and 10% val in hashmap
        const inventoryItemMap = new Map();
        const inventoryItemPercent = new Map();
        for(let i = 0; i <rows2.length; i++){
          let currInventory = rows2[i];
          let currItem = currInventory.itemname;
          let tenPercent = currInventory.currentquantity * 0.1;
          
          inventoryItemMap.set(currItem, 0);
          inventoryItemPercent.set(currItem, tenPercent);
        }
        
        for(let i = 0;i<rows.length;i++){
          let currMenu = rows[i];
          let query = "SELECT * FROM relationship_menutoinventory_unitquantities where menuitemkey = '"+ currMenu.menuitem_key+"';";
          pool.query(query,(error,results) => {
            if(error) {
              throw error;
            }
            let rows3 = results.rows;
            let changeVal = rows3[0].unitquantity * currMenu.quantity +inventoryItemMap.get(rows3[0].inventoryitemkey);
            //console.log(changeVal);

            //Map does not allow value overwriting so currently deleting to update the values
            //Probably need to just switch data type
            if(inventoryItemMap.delete(rows3[0].inventoryitemkey) == true){
              inventoryItemMap.set(rows3[0].inventoryitemkey, changeVal);
            }
          });
        }

        for(let key of inventoryItemMap.keys()){
          if(inventoryItemMap.get(key) < inventoryItemPercent.get(key)){ //&& inventoryItemMap.get(key)!=0){
            finalPairs.push({
              name: key,
              valueUsed: inventoryItemMap.get(key)
            });
          }
        }
        response.status(200).json(finalPairs);
      });
      
  });

};




module.exports = {
  getEmployees,
  getEmployeeByPin,
  /*
  createUser,
  updateUser,
  deleteUser,
  */
  getInventoryItems,
  getExcessReport,
};

