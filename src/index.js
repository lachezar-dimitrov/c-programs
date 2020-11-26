const express = require('express');

const app = express();

app.get('/', (request, response) => { });

app.listen(3000, () => {
  console.log('listening on port 3000');
})