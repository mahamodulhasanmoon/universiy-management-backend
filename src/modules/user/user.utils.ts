import { ISemister } from '../semister/semister.interface';
import { User } from './user.model';


const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    //203001   0001
 
    // eslint-disable-next-line no-undefined
    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
  };

export const genarateStudentID = async (payload: ISemister) => {

  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); // 0000 by deafult

  const lastStudentId = await findLastStudentId();
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(5, 8); //01;
  const lastStudentYear = lastStudentId?.substring(0,4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  console.log(lastStudentId, currentSemesterCode, currentYear);
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(8); // 00001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
