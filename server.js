const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));
// eslint-disable-next-line max-len
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); // eslint-disable-line no-console,
