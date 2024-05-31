import { Schema, model } from 'mongoose';
import { IDepertment } from './depertment.interface';

const depertmentSchema = new Schema<IDepertment>(
  {
    name: {
      type: String,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

depertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await Depertment.findOne(query);

  if (!isDepartmentExist) {
    throw new Error('This department does not exist! ');
  }

  next();
});

export const Depertment = model<IDepertment>('Depertment', depertmentSchema);
