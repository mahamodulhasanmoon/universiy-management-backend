import { Schema, model } from 'mongoose';
import { ISemister } from './semister.interface';
import { monthsEnum } from './semister.const';

const semesterSchema = new Schema<ISemister>(
  {
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'], required: true },
    code: { type: String, enum: ['A01', 'S02', 'F03'], required: true },
    year: { type: String, required: true },
    startMonth: {
      type: String,
      enum: monthsEnum,
      required: true,
    },
    endMonth: {
      type: String,
      enum: monthsEnum,
      required: true,
    },
  },
  { timestamps: true },
);

semesterSchema.pre('save', async function (next) {
  const isExists = await Semester.findOne({ year: this.year, name: this.name });
  if (isExists) {
    throw new Error('Semister Is Already Exists');
  }
  next();
});

export const Semester = model<ISemister>('Semester', semesterSchema);
