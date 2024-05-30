import { z } from 'zod';

// UserName Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(12, { message: 'First name must be at most 12 characters long' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(12, { message: 'Last name must be at most 12 characters long' }),
});

// Guardian Schema
const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContact: z.string().min(1, { message: "Father's contact is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContact: z.string().min(1, { message: "Mother's contact is required" }),
});
const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student Schema
export const studentValidationSchema = z.object({
  body: z.object({
    studentData: z.object({
      name: userNameSchema,
      username: z
        .string()
        .trim()
        .min(1, { message: 'Username is required' })
        .min(4, { message: 'Username must be at least 4 characters long' })
        .max(12, { message: 'Username must be at most 12 characters long' }),
      email: z
        .string()
        .trim()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Email is invalid' }),
      avatar: z.string().optional(),
      gender: z.enum(['male', 'female', 'others'], {
        errorMap: () => ({ message: 'Gender is required' }),
      }),
      dateOfBirth: z
        .string()
        .min(1, { message: 'Date of birth is required' })
        .transform(date => new Date(date)),
      contactNo: z
        .string()
        .trim()
        .min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'AB-', 'O-'], {
          errorMap: () => ({ message: 'Blood group is invalid' }),
        })
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
    }),
  }),
});

// Example usage
export const exampleData = {
  id: '123456',
  name: {
    firstName: 'John',
    lastName: 'Doe',
  },
  username: 'john.doe',
  email: 'john.doe@example.com',
  avatar: 'http://example.com/avatar.jpg',
  gender: 'male',
  dateOfBirth: '2000-01-01T00:00:00.000Z',
  contactNo: '+1234567890',
  emergencyContactNo: '+0987654321',
  bloodGroup: 'A+',
  presentAddress: '123 Main Street, Hometown, Country',
  permanentAddress: '456 Another Street, Hometown, Country',
  guardian: {
    fatherName: 'Robert Doe',
    fatherOccupation: 'Engineer',
    fatherContact: '+1234567890',
    motherName: 'Jane Doe',
    motherOccupation: 'Teacher',
    motherContact: '+0987654321',
  },
  localGuardian: {
    fatherName: 'Michael Smith',
    fatherOccupation: 'Doctor',
    fatherContact: '+1122334455',
    motherName: 'Emily Smith',
    motherOccupation: 'Nurse',
    motherContact: '+5566778899',
  },
  isActive: 'active',
};
