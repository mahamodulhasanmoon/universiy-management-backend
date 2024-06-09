import { Model, Types } from 'mongoose';

export interface IRegisterSemister {
  academicSemister: Types.ObjectId;
  status: 'upcomming' | 'ongoing' | 'ended';
  startDate: Date;
  endDate: Date;
  minCradit: number;
  maxCradit: number;
}

export interface RegisterSemesterModel extends Model<IRegisterSemister> {
  // eslint-disable-next-line no-unused-vars
  isSemesterExist(id: Types.ObjectId): Promise<IRegisterSemister | null>;
}
