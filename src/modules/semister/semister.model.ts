import { Schema, model } from 'mongoose';
import { ISemister, SemisterModel } from './semister.interface';
import { monthsEnum } from './semister.const';

const semesterSchema = new Schema<ISemister, SemisterModel>(
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

semesterSchema.statics.isSemesterExists = async function (id: string) {
  const existingUser = await Semester.findOne({ _id: id });
  return existingUser;
};

export const Semester = model<ISemister, SemisterModel>(
  'Semester',
  semesterSchema,
);
