import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService } from '../services';
import exclude from '../utils/exclude';
import { User } from '@prisma/client';
import { successResponse, errorResponse, processException } from '../utils/common';
import { DOCTOR } from '../utils/core-constants';

const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (await userService.getUserByEmail(email)) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    return errorResponse(res, 'Email already taken');
  }

  const user = await userService.createUser(email, password);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  successResponse(res, 'User registered successfully', { user: userWithoutPassword, tokens });
});
const registerDoctor = catchAsync(async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      education,
      publicationLink,
      currentPlace,
      country,
      otherImportantLink
    } = req.body;
    const user = await userService.createDoctor(
      email,
      password,
      name,
      education,
      publicationLink,
      currentPlace,
      country,
      otherImportantLink
    );
    const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
    const tokens = await tokenService.generateAuthTokens(user);
    successResponse(res, 'User registered successfully', { user: userWithoutPassword, tokens });
  } catch (error) {
    return processException(res, String(error));
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password, res);
  // if (user.role === DOCTOR) {
  //   errorResponse(res, 'Cannot login You are a doctor!');
  // }
  const tokens = await tokenService.generateAuthTokens(user);
  successResponse(res, 'Login successful', { user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  successResponse(res, 'Logout successful');
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  successResponse(res, 'Tokens refreshed successfully', { ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  successResponse(res, 'Forgot password email sent successfully');
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  successResponse(res, 'Password reset successful');
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = req.user as User;
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  successResponse(res, 'Verification email sent successfully');
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token as string);
  successResponse(res, 'Email verified successfully');
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  registerDoctor
};
