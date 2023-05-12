
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./../dist/'));

app.get('./*/', (req, res) => {
  return res.sendFile('./src/index.hbs');
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
}); 