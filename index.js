const express = require("express");
const cors = require("cors");

const app = express();

app.get("/", cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" },
  ];
  res.send(customers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
