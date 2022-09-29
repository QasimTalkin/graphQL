const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'jsonWebTokenSecret-Qasim';
const expiration = process.env.EXPIRATION || '2h';

const signToken = ({ _id, userName, email}) => {
  const payload = { _id, userName, email };
  
  return jwt.sign({ data:payload}, SECRET, { expiresIn: expiration });
}

module.exports = { signToken };