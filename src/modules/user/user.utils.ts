/* eslint-disable no-undefined */

import { ISemister } from '../semister/semister.interface';
import { User } from './user.model';

const findLastStudentId = async (payload: ISemister) => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
      id: { $regex: `${payload.code}${payload.year}-\\d{4}$` },
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
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genarateStudentID = async (payload: ISemister) => {
  let currentID = (0).toString();
  const lastStudentID = await findLastStudentId(payload);
  const lastSemisterCode = lastStudentID?.substring(0, 3);
  const lastSemisterYear = lastStudentID?.substring(3, 7);

  // currentInfo
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentID &&
    lastSemisterCode === currentSemesterCode &&
    lastSemisterYear === currentYear
  ) {
    currentID = lastStudentID?.substring(8);
  }

  const incrementID = (+currentID + 1).toString().padStart(4, '0');

  const incrementalId = `${payload.code}${payload.year}-${incrementID}`;
  return incrementalId;
};

// For Faculty

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
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

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
