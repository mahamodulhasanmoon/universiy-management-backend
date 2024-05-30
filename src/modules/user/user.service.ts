import { defaultPass } from '../../config';
import { Semester } from '../semister/semister.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genarateStudentID } from './user.utils';

export const createStudentService = async (
  password: string,
  payload: IStudent,
) => {
  //  for create a new User
  const userData: Partial<IUser> = {};
  userData.password = password || defaultPass;
  userData.role = 'student';

  const semester = await Semester.findById(payload.admissionSemester);

  if (!semester) {
    throw new Error('Admission semester not found');
  }

  //set  generated id
  userData.id = await  genarateStudentID(semester);

  const user = await User.create(userData);

  // creating a student

  if (Object.keys(user).length) {
    payload.id = user.id;
    payload.user = user._id;
    const result = await Student.create(payload);
    return result;
  }
};
