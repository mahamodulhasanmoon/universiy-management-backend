import { Document, Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export interface IUser extends Document {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked' | 'active';
  isDeleted: boolean;
}

export interface IUserMethod {
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel
  extends Model<IUser, Record<string, never>, IUserMethod> {
  isUserExists(id: string): Promise<IUser | null>;
}
