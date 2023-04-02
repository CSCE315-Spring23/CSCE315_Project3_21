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
module.exports = {
  getEmployees,
  getEmployeeByPin,
  /*
  createUser,
  updateUser,
  deleteUser,
  */
  getInventoryItems,
};
