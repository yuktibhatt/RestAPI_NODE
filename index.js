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


// app.post('/users/new', (req,res) => {
//     const { userID, name, email} = request.body;
//     client.query(`INSERT INTO users (userID, name, email) VALUES ${userID, name, email}`, (err,response) => {
//         if (err) {
//             throw err;
//           }
//           response.status(201).send(`User added with ID: ${result.insertId}`) 
//     });
// });

//delete a user
app.delete('/users/:id', (req,res) => {
    const id = req.params.id;
    client.query(`DELETE FROM users WHERE userID = ${id}`, (err, response) => {
        if(!err)
        res.send("Deleted Succesfully");
        else
        console.log(err);   
    })
});
