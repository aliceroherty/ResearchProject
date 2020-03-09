const settings = require("./modules/settings");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.use("/assets", express.static("assets"))

/*app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`);
});*/

app.get("/", (request, response) => {
    response.render("index", { message: "Hello World!" });
});

app.get("/users/:id", (request, response) => {
    response.send("You requested a user with the ID: " + request.params.id);
});

app.get("/form", (request, response) => {
    response.sendFile(`${__dirname}/views/form.html`);
});

app.post("/form", urlEncodedParser, (request, response) => {
    response.send(request.body);
    console.log(request.body.firstName);
    console.log(request.body.lastName);
});

app.listen(settings.port, () => {
    console.log(`The server is listening on port ${settings.port}...`);
});