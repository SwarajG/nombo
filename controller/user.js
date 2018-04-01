const User = require('../model/user');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Users';

module.exports = {
  createUser: (email, cb) => {
    const params = {
      TableName: table,
      Item: {
        userId: uuid.v1(),
        email
      }
    };
    docClient.put(params, (err, data) => {
      if (err) {
        cb(err, null);
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      } else {
        cb(null, data);
        console.log('Added item:', JSON.stringify(data, null, 2));
      }
    });
  }
};