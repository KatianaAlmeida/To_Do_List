const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const PORT = process.env.PORT || 5000;// process.env.PORT = if we want to publish the app later on

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

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

    const params = req.body
    
    data.query("INSERT INTO task SET ?", params,(err, rows) => {
      data.release() // return the data to pool

      if(!err){
        res.send(`Task with the name: ${params.name} has been added.`) // display data
      } else {
        console.log(err)
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
app.put("/api/todolist",(req, res) => {
  
  pool.getConnection((err, data) => {
    if(err) return res.json(`Error! Message: ${err.message}`);
    console.log(`connected as id ${data.threadId}`)

    const {ID, name, description, date, priority, status} = req.body
    
    data.query("UPDATE task SET name = ?,  description = ?, date = ?, priority = ?, status = ? WHERE ID = ?", 
      [name, description, date, priority, status, ID], (err, rows) => {
      data.release() // return the data to pool

      if(!err){
        res.send(`Task with the name: ${name} has been added.`) // display data
      } else {
        console.log(err)
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
        res.send(`Task with the Record ID ${[req.params.id]} has been removed.`) // display data
      } else {
        console.log(err.message)
      }
    })
    
  })
});

/* ----- Listen on enviroment port or 5000 ----- */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});