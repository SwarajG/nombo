require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.PRIVATE_KEY,
  region: process.env.REGION,
});

console.log(process.env.ACCESS_KEY, process.env.PRIVATE_KEY, process.env.REGION);

const userController = require('./controller/user');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  userController.createUser(email, (error, data) => {
    if (data) {
      res.status(200).json(data);
    } else if (error) {
      res.status(500).json(error);
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});