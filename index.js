const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: 'AKIAJT2JFK63QWAOFDOA',
  secretAccessKey: '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',
  region: 'us-west-2',
});

const userController = require('./controller/user');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
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