const { Client } = require('pg');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

const client = new Client({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "empdb"
})

client.connect((err) => {
    if(!err)
    console.log("Db connection successful");
    else
    console.log("Db connections fails \n Error: " + Json.stringify(err, undefined, 2));
});

app.listen(8000, () => console.log('Exress server up'));

//get method 
app.get('/users', (req,res) => {
    client.query('SELECT * FROM users', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);   
    })
});

//get an employee
app.get('/users/:id', (req,res) => {
    const id = req.params.id;
    client.query(`SELECT * FROM users WHERE userID = ${id}`, (err, response) => {
        if(!err)
        res.send(response.rows);
        else
        console.log(err);   
    })
});


