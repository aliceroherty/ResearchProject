const express = require("express");
const sql = require("mssql");

const app = express();

app.set('view engine', 'ejs');

app.get("/employees", (req, res) => {
    const config = {
        user: "Node",
        password: "password",
        server: "localhost",
        database: "Northwind"
    }

    sql.connect(config, error => {
        if(error){
            console.log(`Connection Error: ${error}`)
        }

        let request = new sql.Request();

        request.query("SELECT * FROM Employees", (error, results) => {
            if(error){
                console.log(`Query Error: ${error}`)
            }

            res.render("employees/index", {employees: results.recordset})
        })
    })
});

app.get("/customers", (req, res) => {
    //Configuration Object for our sql connection
    //Replaces the connection string
    const config = {
        user: "Node",
        password: "password",
        server: "localhost",
        database: "Northwind"
    }

    sql.connect(config, error => 
    {
        //If an error occures creating the connection log it to the console
        if (error) {
            console.log(`Connection Error: ${error}`)
        }

        //Creating a new sql request (Similar to SqlCommand in C#)
        let request = new sql.Request();

        //Run this query and then execute the callback function
        request.query("SELECT * FROM Customers", (error, results) => {
            //If an error occures running the query log it to the console
            if (error) {
                console.log(`Query Error: ${error}`);
            }

            //send the results of the query to the user
            //res.send(results.recordset[0].CustomerID);

            //Rendering the index view in the customers folder and passing the recordset to the view
            res.render("customers/index", {customers: results.recordset});
        })
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

//Telling our server to listen on port 80
const port = 1234;
app.listen(port);
console.log(`The Server is listening on port ${port}`);