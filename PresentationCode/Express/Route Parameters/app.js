const express = require("express");
const app = express();

app.get("/Posts/:id", (request, response) => {
    response.send(request.params.id);
});

app.listen(80);