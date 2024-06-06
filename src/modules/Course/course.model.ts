import { Schema, model } from 'mongoose';
import { ICourse, IPreRequisiteCourses } from './course.interface';

// Define the schema for pre-requisite courses
const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});


const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});


export const Course = model<ICourse>('Course', courseSchema);

