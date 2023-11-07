import { LoginUserModel } from '../models/user.model';

export const testUser1: LoginUserModel = {
  userEmail: (process.env.USER_EMAIL as string) ?? 'NOT_SET',
  userPassword: (process.env.USER_PASSWORD as string) ?? 'NOT_SET',
};
