import { startSession } from 'mongoose';

import { defaultPass } from '../../config';
import { Semester } from '../semister/semister.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genarateStudentID, generateFacultyId } from './user.utils';
import httpStatus from 'http-status';
import { CustomError } from '../../errors/CustomError';
import { IFacultyMember } from '../facultyMember/facultymember.interface';
import { FacultyMember } from '../facultyMember/facultyMember.model';
import { Depertment } from '../depertment/depertment.model';

export const createStudentService = async (
  password: string,
  payload: IStudent,
) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const userData: Partial<IUser> = {
      password: password || defaultPass,
      role: 'student',
    };

    const semester = await Semester.findById(payload.admissionSemester);
    if (!semester) {
      throw new Error('Admission semester not found');
    }

    userData.id = await genarateStudentID(semester);

    const user = await User.create([userData], { session });

    if (!user || user.length === 0) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed To create User');
    }

    payload.id = user[0].id;
    payload.user = user[0]._id;

    const result = await Student.create([payload], { session });

    if (!result || result.length === 0) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed To create Student');
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new CustomError(400, error.message);
  }
};

export const createFacultyMemberService = async (
  password: string,
  payload: IFacultyMember,
) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (defaultPass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await Depertment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new CustomError(400, 'Academic department not found');
  }

  const session = await startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyMember.create([payload], { session });

    if (!newFaculty.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
