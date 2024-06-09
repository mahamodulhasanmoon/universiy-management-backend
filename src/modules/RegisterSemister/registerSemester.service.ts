import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { CustomError } from '../../errors/CustomError';
import { RegisterSemister } from './RegisterSemister.model';
import { IRegisterSemister } from './registerSemister.interface';
import { Semester } from '../semister/semister.model';

export const createRegisterSemesterService = async (
  payload: IRegisterSemister,
) => {
  const [isExist, isExist2] = await Promise.all([
    RegisterSemister.isSemesterExist(payload.academicSemister),
    Semester.isSemesterExists(payload.academicSemister),
  ]);

  if (isExist) {
    throw new CustomError(httpStatus.CONFLICT, 'Record Already Exists');
  }

  if (!isExist2) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Semester Not Found');
  }
  const result = await RegisterSemister.create(payload);
  return result;
};
export const getAllRegisterSemesterService = async (
  query: Record<string, unknown>,
) => {
  const registerQuery = new QueryBuilder(RegisterSemister.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await registerQuery.modelQuery;
  return result;
};
export const getRegisterSemesterByIDService = async () => {};
