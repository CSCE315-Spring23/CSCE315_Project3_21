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


/* this could be easily migrated to a different file 
(part of why this is a new branch so we have those options on merge)*/
const getInventoryLevelsEndDayRecommended = (request, response) => {
  pool.query('SELECT * FROM inventory_item;', (error, results) => {
    if (error) {
      throw error;
    }
    let rows1 = results.rows;
    
    //console.log(rows1[0].maxquantity - rows1[0].currentquantity);
    /*for(let i = 0; rows1.length; i++){
      let curr = rows1[i];
      let recommended = curr.maxquantity - curr.currentquantity / curr.shipmentunit; 
      if(recommended == 0){
        recommended = curr.maxquantity/curr.shipmentunit;
      }
      let query = "UPDATE inventory_item set recommendedReorderQuantity =" +recommended +"WHERE itemName = '" +rows1[i].itemname+"';";
        pool.query(error, (error, results) => {
          if (error) {
            throw error;
          }
        });
    }
    */
    response.status(200).json(rows1);
  });
};


const getInventoryLevelsEndDayRecordArrival = (request, response) => {
  const restockOrderIdUsrInput = request.query.id;
  if(!id){
    response.status(400).json({error: 'ID not given'});
  }
  //get current date

  //send command to update the restock order with arrived 
  let updateRestockArrivedStr = "UPDATE restock_order SET arrived = '"+ date+ "' where id ="+ restockOrderIdUsrInput+"AND arrived IS NULL;";
  
  //send command to get information about the restock to inventory
  let selectSQLRestockToInventoryStr = "SELECT * from relationship_restocktoinventory where restockorder_key = (SELECT id from restock_order where id = "+restockOrderIdUsrInput+" AND arrived IS NULL);";
  
  //loop through restock to inventory 
  
  //send command to inventory table for a specific item 
  let selectInventoryConversionStr = "SELECT * FROM inventory_item WHERE itemname = '"+inventoryKey+"';";

  //initialize value with multiplied restock quantity (shipment units) and shipment unit (product units) conversion
  let restockQuantityAdjusted = restockQuantity * shipmentUnit;
  
  //send command update each inventory item based on restock quantity
  let updateInventoryStr =  "UPDATE inventory_item SET currentquantity = currentquantity + "+restockQuantityAdjusted +"WHERE itemname = '"+inventoryKey+"';";

  pool.query('SELECT * FROM inventory_item LIMIT 20', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
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
  getInventoryLevelsEndDayRecommended,
  getInventoryLevelsEndDayRecordArrival,

};
