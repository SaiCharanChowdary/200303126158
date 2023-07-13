const express = require('express');
const app = express();
const server = require('./server');

const port = 8008;

app.use('/', server);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
