import { startSession } from 'mongoose';
import { CustomError } from '../../app/errors';
import { defaultPass } from '../../config';
import { Semester } from '../semister/semister.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genarateStudentID } from './user.utils';
import httpStatus from 'http-status';

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
      throw new CustomError('Failed To create User', httpStatus.BAD_REQUEST);
    }

    payload.id = user[0].id;
    payload.user = user[0]._id;

    const result = await Student.create([payload], { session });

    if (!result || result.length === 0) {
      throw new CustomError(
        'Failed To create Student',
        httpStatus.BAD_REQUEST,
      );
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error:any) {
    await session.abortTransaction();
    session.endSession();
    throw new CustomError(error.message,400)
  }
};

