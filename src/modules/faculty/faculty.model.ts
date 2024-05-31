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

facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await Faculty.findOne(query);

  if (!isDepartmentExist) {
    throw new Error('This department does not exist! ');
  }

  next();
});

export const Faculty = model<IFaculty>('Faculty', facultySchema);
