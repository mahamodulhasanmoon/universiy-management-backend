import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

export const createFacultyService = async (payload: IFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};

export const getAllFacultyService = async () => {
  const result = await Faculty.find({});
  return result;
};

export const getFacultyByIdService = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};

// Update Semester

export const updateFacultyService = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const result = await Faculty.updateOne(
    { _id: id },
    { $set: payload },
    { upsert: true },
  );

  return result;
};
