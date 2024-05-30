import { semisterNameCodeWrapper } from './semister.const';
import {  ISemister } from './semister.interface';
import { Semester } from './semister.model';

export const createSemisterService = async (payload: ISemister) => {

  if (semisterNameCodeWrapper[payload.name] !== payload.code) {
    throw new Error('invalid semister Code   ' + payload.name);
  }

  const result = await Semester.create(payload);
  return result;
};

export  const getAllSemesterService = async()=>{
    const result = await Semester.find({})
    return result
}

export  const getSemesterByIdService = async(id:string)=>{
    const result = await Semester.findById(id)
    return result
}


// Update Semester 

export const updateSemisterService = async (id:string,payload:Partial<ISemister>) => {

    if ( payload.name &&
        payload.code && semisterNameCodeWrapper[payload.name] !== payload.code) {
      throw new Error('invalid semister Code   ' + payload.name);
    }
  
    const result = await Semester.updateOne({ _id: id }, { $set: payload }, { upsert: true });
        
    return result;
  };