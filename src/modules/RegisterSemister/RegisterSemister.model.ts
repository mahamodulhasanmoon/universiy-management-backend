import { Schema, model } from 'mongoose';
import {
  IRegisterSemister,
  RegisterSemesterModel,
} from './registerSemister.interface';

// Define the schema
const RegisterSemisterSchema = new Schema<
  IRegisterSemister,
  RegisterSemesterModel
>({
  academicSemister: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemister',
    required: true,
  },
  status: {
    type: String,
    enum: ['upcomming', 'ongoing', 'ended'],
    default: 'upcomming',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCradit: {
    type: Number,
    required: true,
  },
  maxCradit: {
    type: Number,
    required: true,
  },
});

//  Checking Semister is Exist or not
RegisterSemisterSchema.statics.isSemesterExist = async function (id: string) {
  const existingUser = await RegisterSemister.findOne({ academicSemister: id });
  return existingUser;
};

export const RegisterSemister = model<IRegisterSemister, RegisterSemesterModel>(
  'RegisterSemister',
  RegisterSemisterSchema,
);
