import { z } from "zod";
import mongoose from "mongoose";

export const preRequisiteCoursesSchema = z.object({
  course: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be a string",
  }).refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Course ID must be a valid ObjectId",
  }),
  isDeleted: z.boolean({
    required_error: "isDeleted is required",
    invalid_type_error: "isDeleted must be a boolean",
  }),
});

export const createCourseValidationSchema = z.object({
    body: z.object({
      title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      }),
      prefix: z.string({
        required_error: "Prefix is required",
        invalid_type_error: "Prefix must be a string",
      }),
      code: z.number({
        required_error: "Code is required",
        invalid_type_error: "Code must be a number",
      }).int("Code must be an integer"),
      credits: z.number({
        required_error: "Credits are required",
        invalid_type_error: "Credits must be a number",
      }).int("Credits must be an integer"),
      isDeleted: z.boolean().optional(),
      preRequisiteCourses: z.array(preRequisiteCoursesSchema),
    })
  });