import { Schema, model } from 'mongoose';
import {
  Guardian,
  IStudent,
  LocalGuardian,
  StudentModel,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContact: {
    type: String,
    required: [true, "Father's contact is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContact: {
    type: String,
    required: [true, "Mother's contact is required"],
  },
});
const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    profileImg: { type: String },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloogGroup: {
      type: String,
      enum: {
        values: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'AB-', 'O-'],
        message: 'Blood group is invalid',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, 'Local guardian information is required'],
    },
  },
  {
    timestamps: true,
  },
);

// static Custom
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// studentSchema.methods.isUserExist = async function (id:string) {
//   const existingUser = await  Student.findOne({id})
//   return existingUser

// }

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
