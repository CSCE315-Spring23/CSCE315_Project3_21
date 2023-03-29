# CSCE315_Project3_21

First Commit Instructions

[Will format this later]
--------------------------------------------------
After first pulling
1) in a terminal run the command: npm install
2) npm is the node package manager and will automatically install the packages specified by the package.json file

--------------------------------------------------
Making .env file instructions

1) make a file named ".env" in this directory\
1.5) you might need to use pgadmin but try it without first\
2) copy the following and add your personal credentials

DB_USER=csce315331_"your last name"\
DB_HOST=csce-315-db.engr.tamu.edu\
DB_NAME=csce315331_team_21\
DB_PASSWORD="your password"\
DB_PORT=5432

--------------------------------------------------
To start the node server
1) in a terminal run the command: npm run dev
2) this will host a server on localhost:3000

-------------------------------------------------
Testing routes with Postman

Running a GET request with Postman:\
localhost:3000/employees\
will return all employees

Running a GET request with Postman:\
localhost:3000/employee?pin=1111\
will return the employee with pin = 1111\
- take note of the format in the queries.js file

Running a GET request with Postman:\
localhost:3000/inventory_items\
same idea


-------------------------------------------------
