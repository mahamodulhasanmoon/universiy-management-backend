import { startSession } from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { CustomError } from '../../errors/CustomError';
import { studentSearchableFields } from './student.constant';
import { QueryBuilder } from '../../builder/QueryBuilder';

export const getAllStudentService = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find().populate('admissionSemester'),
    // .populate({
    //   path: 'academicDepartment',
    //   populate: {
    //     path: 'academicFaculty',
    //   },
    // })
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

export const getStudentByIdService = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

export const deleteStudentService = async (id: string) => {
  if ((await Student.isUserExist(id)) === null) {
    throw new CustomError(404, 'User Not Exist');
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { $set: { isDeleted: true } }, // Update syntax: $set is used to set a field's value
      { session, new: true }, // Pass session as an option and set new: true to return the updated document
    );

    if (!deletedStudent) {
      throw new CustomError(400, 'failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { $set: { isDeleted: true } }, // Update syntax: $set is used to set a field's value
      { session, new: true }, // Pass session as an option and set new: true to return the updated document
    );

    if (!deletedUser) {
      throw new CustomError(400, 'failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new CustomError(error.status, 'failed to delete User', error); // Re-throw the error to propagate it up the call stack
  }
};
