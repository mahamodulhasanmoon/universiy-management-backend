import httpStatus from 'http-status';
import { CustomError } from '../../errors/CustomError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
export const loginService = async (payload: ILoginUser) => {
  const user = await User.isUserExists(payload.id);

  if (!user) {
    throw new CustomError(404, 'User not exists please create an account');
  }
  // user is softDeleted
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Already Deleted User');
  }

  if (user.status === 'blocked') {
    throw new CustomError(
      httpStatus.FORBIDDEN,
      'User is Bolocked please contact administrator',
    );
  }

  // password is valid or not
  const isPasswordValid = (user as any).comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Invalid UserID or Password');
  }

  // access Granted: send  Access token and genarate refresh token

  const result = payload;

  return result;
};
