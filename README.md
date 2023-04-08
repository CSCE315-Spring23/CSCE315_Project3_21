# CSCE315_Project3_21

[Will format this later]
--------------------------------------------------
After first pulling
1) in a terminal run the commands:\
    cd server\
    npm install
2) in a SEPERATE terminal run the commands:\
    cd client\
    npm install


--------------------------------------------------
Running
1) cd into server directory (if not already there)
2) run the command: npm run dev
3) in a seperate terminal, cd inside the client directory (if not already there)
4) run the command: npm start

NOTE: This is like the same as before but the directory structure has changed to 
hold the react frontend. The server must be started before the frontend

ANOTHER IMPORTANT NOTE: The frontend is on localhost:3000 and the backend is on localhost:3001

--------------------------------------------------
Frontend Notes
- Each component will be it's own .js file
- We will be using the grid component to organize our layout (see App.js)
- refer to the material ui documentation for basics https://mui.com/material-ui/getting-started/overview/
- Displaying our tables will be done with the material react table api, I used the basic table to implement the restock report table but we can use more advanced ones for tables that require CRUD https://www.material-react-table.com/docs/examples/editing-crud
- See the React Docs for how components work (they're basically classes that are used to represent frontend items) \
https://legacy.reactjs.org/docs/react-component.html \
https://react.dev/learn/your-first-component
- We will definitely have to restructure how things are embedded as the project gets more complicated
- Ask Thomas for any additional questions