const express = require('express');
const bodyParser = require('body-parser');
const dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: 'AKIAIE6SV2T63O7X6JRA',
  secretAccessKey: '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',
  region: 'us-west-2',
});

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