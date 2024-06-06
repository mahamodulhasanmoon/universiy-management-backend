import { QueryBuilder } from '../../builder/queryBuilder';
import { ICourse } from './course.interface';
import { Course } from './course.model';

export const createCourseService = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

export const getAllCourseService = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Course.find(), query);

  return result;
};

export const getCourseByIdService = async (id:string) => {
    const result =  await  Course.findById(id)

    return result; 
};

export const updateCourseByIdService = async (id:string,payload:ICourse) => {
    const result =  await  Course.findByIdAndUpdate(id,payload,{
        new:true
    })

    return result;  
};

export const deleteCourseByIdService = async (id:string) => {
    const result =  await  Course.findByIdAndUpdate(id,{
        isDeleted:true
    },{
        new:true
    })

    return result; 
};
