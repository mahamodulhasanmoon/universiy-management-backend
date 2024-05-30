import { Types } from 'mongoose';
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
}
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: UserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  admissionSemester: Types.ObjectId;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isDeleted: boolean;
}

// static methods

export interface StudentModel extends Model<IStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<IStudent | null>;
}

// instance method
//   export type StudentMethods = {
//     isUserExist(id:string):Promise<IStudent | null>
//   }

//  export  type StudentModel = Model<IStudent,Record<string,never>,StudentMethods>
