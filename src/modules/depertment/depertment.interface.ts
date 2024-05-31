import { Types } from 'mongoose';

export interface IDepertment {
  name: string;
  faculty: Types.ObjectId;
}
