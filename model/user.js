const dynamo = require('dynamodb');
const Joi = require('joi');

const User = dynamo.define('User', {
  hashKey: 'userId',
  timestamps: true,
  schema: {
    userId: dynamo.types.uuid(),
    email: Joi.string().email()
  }
});

module.exports = User;