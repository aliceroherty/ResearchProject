const express = require('express');
const bodyParser = require("body-parser");

const app = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

app.post("/", urlEncodedParser, (request, response) => {
    response.send(request.body);
});

app.listen(80);

