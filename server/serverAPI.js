const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); // Initialize the Express application

// Use bodyParser middleware to parse URL-encoded data with the querystring library (extended: false)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()) // Use bodyParser middleware to parse JSON data
app.use(cors()); // Enable CORS with default options, allowing cross-origin requests from different ports

/* ----- database connection pool Start -----              SupaBase - PostgreSQL*/
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  ssl: {
    rejectUnauthorized: false
  }
});
/* ----- database connection pool End----- */

/* ----- create a backend endpoint (the location the API service is located) ----- */

// Create/Insert task
app.post("/api/todolist", async (req, res) => {
  try {
    const { name, description, date, priority, status } = req.body;

    await pool.query(
      "INSERT INTO task (name, description, date, priority, status) VALUES ($1,$2,$3,$4,$5)",
      [name, description, date, priority, status]
    );

    res.json({ message: "Task added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read/Select All task
app.get("/api/todolist", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read/Select by ID task
app.get("/api/todolist/:id", async (req, res) => {
  try {

    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM task WHERE id = $1",
      [id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: `Error! Message: ${err.message}`
    });
  }
});
// Update task
app.put("/api/todolist/:id", async (req, res) => {

  try {

    const { name, description, date, priority, status } = req.body;
    const id = req.params.id;

    await pool.query(
      "UPDATE task SET name = $1, description = $2, date = $3, priority = $4, status = $5 WHERE id = $6",
      [name, description, date, priority, status, id]
    );

    res.json({
      message: `Task with the name: ${name} has been updated.`
    });

  } catch (err) {
    res.status(500).json({
      error: `Error! Message: ${err.message}`
    });
  }

});

// Delete task
app.delete("/api/todolist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM task WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: `Task with id ${id} has been deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app; //  making the app object available to other modules in the application

//export default app

/*
// ---------------- LOCAL_HOST -----------------
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql");

const app = express(); // Initialize the Express application

// Use bodyParser middleware to parse URL-encoded data with the querystring library (extended: false)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()) // Use bodyParser middleware to parse JSON data
app.use(cors()); // Enable CORS with default options, allowing cross-origin requests from different ports

// ----- database connection pool Start -----              LOCALHOST 

const  pool = mysql.createPool({
  connectionLimit: 10, // the maximum number of connections to create at once 
  host           : "localhost",
  user           : "root",
  password       : "mysql",
  database       : "to_do_list"
})

// ----- create a backend endpoint (the location the API service is located) ----- 

// Create/Insert task
app.post("/api/todolist",(req, res) => {

  // Get a connection from the pool
  pool.getConnection((err, data) => {
    if(err) return res.json(`Error: ${err}`);
    
    console.log(`connected as id ${data.threadId}`)

    const params = req.body;

    // Constructing the SQL query
    const sqlCode = 'INSERT INTO task (name, description, date, priority, status) VALUES (?, ?, ?, ?, ?)';
    const values = [params.name, params.description, params.date, params.priority, params.status]; // Adjust as needed

    // Execute the SQL query
    data.query(sqlCode, values,(err, rows) => {
      data.release() // Release the connection back to the pool

      if(!err){
        // Send a success message as a JSON response
        res.json({ message: `Task with the name: ${params.name} has been added.` });
      } else {
        // Send an error message as a JSON response with status 500 (Internal Server Error)
        res.status(500).json({ error: `Error! Message: ${err.message}` });
      }
    })

    console.log(req.body)
    
  })
});

// Read/Select All task
app.get("/api/todolist",(req, res) => {
  
  pool.getConnection((err, data) => {
    if(err) return res.json(`Error: ${err}`);
    console.log(`connected as id ${data.threadId}`)

    data.query("SELECT * FROM task", (err, rows) => {
      data.release() // return the data to pool

      if(!err){
        res.send(rows)
      } else {
        console.log(err)
      }
    })
    
  })
});

// Read/Select by ID task
app.get("/api/todolist/:id",(req, res) => {

  pool.getConnection((err, data) => {
    if(err) return res.json(`Error! Message: ${err.message}`);
    console.log(`connected as id ${data.threadId}`)
    
    // [req.params.id] -> get the id being passed from the browser into the code
    data.query("SELECT * FROM task WHERE id = ?", [req.params.id], (err, rows) => {
      data.release() // return the data/connection to pool

      if(!err){
        res.send(rows) 
      } else {
        console.log(err.message)
      }
    })
    
  })
});

// Update task
app.put("/api/todolist/:id",(req, res) => {
  
  pool.getConnection((err, data) => {
    if(err) return res.json(`Error: ${err}`);
    console.log(`connected as id ${data.threadId}`)

    const {name, description, date, priority, status} = req.body
    
    data.query("UPDATE task SET name = ?,  description = ?, date = ?, priority = ?, status = ? WHERE ID = ?", 
      [name, description, date, priority, status, req.params.id], (err, rows) => {
      data.release() // return the data to pool

      if(!err){
        res.json({ message: `Task with the name: ${name} has been updated.` });
      } else {
        res.status(500).json({ error: `Error! Message: ${err.message}` });
      }
    })

    console.log(req.body)
    
  })
});

// Delete task
app.delete("/api/todolist/:id",(req, res) => {

  pool.getConnection((err, data) => {
    if(err) return res.json(`Error: ${err}`);
    console.log(`connected as id ${data.threadId}`)
    
    // [req.params.id] -> get the id being passed from the browser into the code
    data.query("DELETE FROM task WHERE id = ?", [req.params.id], (err, rows) => {
      data.release() // return the data/connection to pool

      if(!err){
        res.json({ message: `Task with the id: ${req.params.id} has been deleted.` });
      } else {
        res.status(500).json({ error: `Error! Message: ${err.message}` });
      }
    })
    
  })
});

module.exports = app; //  making the app object available to other modules in the application

//export default app
*/