// ./src/components/user.controller.js
import { StatusCodes } from 'http-status-codes';
import { loginUser as loginModel } from '../models/AuthModel.js';
import { generateAccessToken } from '../helpers/jwt.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginModel(email, password);
    const accessToken = generateAccessToken(user);
    return res.status(StatusCodes.OK).json({ accessToken, user });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export { login };
