const settings = require("./modules/settings");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./modules/logger");

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

/*app.get("/form", (request, response) => {
    response.sendFile(`${__dirname}/views/form.html`);
});*/

app.get("/form", (request, response) => {
    response.render("form");
});

app.post("/form", urlEncodedParser, (request, response) => {
    response.send(request.body);
    logger.log(request.body.firstName);
    logger.log(request.body.lastName);
});

app.get("/mailingList", (request, response) => {
    response.render("mailingList");
});

app.post("/mailingList", urlEncodedParser, (request, response) => {
    let data = {
        name: request.body.name, 
        address: request.body.address,
        email: request.body.email
    }
    response.render("mailingListSuccess", data);
});

app.get("/pets", (request, response) => {
    let pets = [
        "Cat", 
        "Dog", 
        "Ferret", 
        "Hamster",
        "Bird",
        "Rat", 
        "Snake"
    ];

    response.render("petList", {pets});
});

app.listen(settings.port, () => {
    logger.log(`The server is listening on port ${settings.port}...`);
});