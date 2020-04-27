const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.json());

require('./routes/index') (app);

app.listen(3333);
console.log('serverern er startet på http://localhost:3333');