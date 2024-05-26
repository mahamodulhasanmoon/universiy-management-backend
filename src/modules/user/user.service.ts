import { defaultPass } from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

export const createStudentService = async (
  password: string,
  studentData: IStudent,
) => {
  //  for create a new User
  const userData: Partial<IUser> = {};
  userData.password = password || defaultPass;
  userData.role = 'student';
  userData.id = 'student';
  const user = await User.create(userData);

  // creating a student

  if (Object.keys(user).length) {
    studentData.id = user.id;
    studentData.user = user._id;
    const result = await Student.create(studentData);
    return result;
  }
};
