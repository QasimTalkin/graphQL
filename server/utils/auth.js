const jwt = require('jsonwebtoken');

const SECRET = 'jsonWebTokenSecret-Qasim';
const expiration = '2h';

const signToken = ({ _id, userName, email}) => {
  const payload = { _id, userName, email };
  const token = jwt.sign({ data: payload }, SECRET, { expiresIn: expiration });
  console.log(`Bearer ${token}`);
  return token
}
const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }
  if (!token) {
    return req;
  }
  try {
    const { data } = jwt.verify(token, SECRET);
    req.user = data;
    
   return req;
  } catch {
    console.log('Invalid token');
  }
  return req;
}

module.exports = { signToken, authMiddleware };