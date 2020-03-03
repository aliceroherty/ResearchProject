const express = require("express");
const app = express();

app.use("/assets", express.static("assets"));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.listen(80);

