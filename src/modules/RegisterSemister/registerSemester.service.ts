import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { CustomError } from '../../errors/CustomError';
import { RegisterSemister } from './RegisterSemister.model';
import { IRegisterSemister } from './registerSemister.interface';
import { Semester } from '../semister/semister.model';
import { RegistrationStatus } from './registerSemester.constant';

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

// update

export const updateRegisterSemesterService = async (
  id: string,
  payload: Partial<IRegisterSemister>,
) => {
  const isRegisterSemisterExists = await RegisterSemister.findById(id);

  if (!isRegisterSemisterExists) {
    throw new CustomError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isRegisterSemisterExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await RegisterSemister.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
