import { Model, Types } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TSemisterName = 'Autumn' | 'Summer' | 'Fall';
export type TSemisterCode = 'A01' | 'S02' | 'F03';

export interface ISemister {
  name: TSemisterName;
  code: TSemisterCode;
  year: string;
  startMonth: Month;
  endMonth: Month;
}

export type ISemesterNameCodeWrapper = {
  [key: string]: string;
};

export interface SemisterModel extends Model<ISemister> {
  // eslint-disable-next-line no-unused-vars
  isSemesterExists(id: Types.ObjectId): Promise<ISemister | null>;
}
