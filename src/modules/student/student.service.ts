import { startSession } from 'mongoose';
import { Student } from './student.model';
import { CustomError } from '../../app/errors';
import { User } from '../user/user.model';

export const deleteStudentService = async (id: string) => {
  if ((await Student.isUserExist(id)) === null) {
    throw new CustomError(404, 'User Not Exist');
  }
  console.log(await Student.isUserExist(id));

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
