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
    return lastStudent?.id ? lastStudent.id.substring(8) : undefined;
  };

export const genarateStudentID = async (payload: ISemister) => {
  const currentID = (await findLastStudentId()) || (0);
  const incrementID = (+currentID + 1).toString().padStart(4, '0');



  const incrementalId = `${payload.code}${payload.year}-${incrementID}`;
  return incrementalId;
};