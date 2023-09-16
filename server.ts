const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));

app.use("*", (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
// eslint-disable-next-line max-len
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); // eslint-disable-line no-console,
