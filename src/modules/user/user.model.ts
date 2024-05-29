import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import { saltRound } from '../../config';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
        message:
          '{VALUE} is not a valid role. Valid roles are admin, student, faculty.',
      },
      required: [true, 'Role is required.'],
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked', 'active'],
        message:
          '{VALUE} is not a valid status. Valid statuses are in-progress, blocked, active.',
      },
      required: [true, 'Status is required.'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      required: [true, 'IsDeleted is required.'],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(user.password, Number(saltRound));
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser>('User', userSchema);
