const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { json } = require("express");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/features", (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection:", err);
        res.status(500).json({ error: "Error connecting to the database" });
        return;
      }

      connection.query("SELECT * FROM features", (err, results) => {
        connection.release();

        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Error executing query" });
          return;
        }
        console.log(results);
        res.json(results);
      });
    });
  } catch (error) {
    console.log(error);
    return;
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
