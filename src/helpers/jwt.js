import jwt from 'jsonwebtoken';

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '48h',
  });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

export { generateAccessToken, verifyToken };
