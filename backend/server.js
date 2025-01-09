const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM tasks WHERE ID = ?';
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data[0]);
  });
});

app.post('/create', (req, res) => {
  const { task, description } = req.body;
  const sql = 'INSERT INTO tasks (task, description) VALUES (?, ?)';
  db.query(sql, [task, description], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put('/update/:id', (req, res) => {    
  const sql = "UPDATE tasks SET `task`= ?, `description` = ? WHERE id = ?";    
  const { task, description } = req.body; 
  const id = req.params.id;        
  db.query(sql,  [task, description, id], function (err, data) {
      console.log(data);
      if (err) return res.json("Error!!");
      return res.json(data);
    })
  })

  app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM tasks WHERE ID = ?';
    db.query(sql, [id], (err, data) => {
      if (err) return res.status(500).json("Error");
      return res.status(200).json({ message: "Task deleted successfully" });
    });
  });

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});