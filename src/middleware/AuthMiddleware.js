import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export function AuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'Invalid token' });
    }
    req.user = user;

    next();
  });
}
