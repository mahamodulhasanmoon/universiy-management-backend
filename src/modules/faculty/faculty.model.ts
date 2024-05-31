import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    name: {
      type: String,
      unique: true,
    },
},
  {
    timestamps: true,
  },
);



export const Faculty = model<IFaculty>('Faculty', facultySchema);
