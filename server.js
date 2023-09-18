const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));

app.use('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); // eslint-disable-line no-console, max-len
