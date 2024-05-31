import  {  Schema,  model } from 'mongoose';
import { IDepertment } from './depertment.interface';

const facultySchema = new Schema<IDepertment>(
  {
    name: {
      type: String,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref:'Faculty',
      required: true,
    },
},
  {
    timestamps: true,
  },
);



export const Depertment = model<IDepertment>('Depertment', facultySchema);