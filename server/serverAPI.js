const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors()); // CORS with default options to use different ports

/* ----- database connection pool Start ----- */
const  pool = mysql.createPool({
  connectionLimit: 10, // the maximum number of connections to create at once 
  host           : "localhost",
  user           : "root",
  password       : "mysql",
  database       : "to_do_list"
})
/* ----- database connection pool End----- */

/* ----- created a backend endpoint (the location the API service is located) ----- */

// Create/Insert task
app.post("/api/todolist",(req, res) => {
  
  pool.getConnection((err, data) => {
    if(err) return res.json(`Error! Message: ${err.message}`);
    console.log(`connected as id ${data.threadId}`)

    const params = req.body;

    // Constructing the SQL query
    const sqlCode = 'INSERT INTO task (name, description, date, priority, status) VALUES (?, ?, ?, ?, ?)';
    const values = [params.name, params.description, params.date, params.priority, params.status]; // Adjust as needed

    data.query(sqlCode, values,(err, rows) => {
      data.release() // return the data to pool

      if(!err){
        res.json({ message: `Task with the name: ${params.name} has been added.` });
      } else {
        res.status(500).json({ error: `Error! Message: ${err.message}` });
      }
    })

    console.log(req.body)
    
  })
});

// Read/Select All task
app.get("/api/todolist",(req, res) => {
  
  pool.getConnection((err, data) => {
    if(err) return res.json(`Error! Message: ${err.message}`);
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
    if(err) return res.json(`Error! Message: ${err.message}`);
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
    if(err) return res.json(`Error! Message: ${err.message}`);
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

module.exports = app; //  making the app object available to other modules in your application

//export default app