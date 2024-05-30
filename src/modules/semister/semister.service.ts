import { ISemister } from "./semister.interface";
import { Semester } from "./semister.model";

type ISemesterNameCodeWrapper ={
    [key: string]: string
}



export const createSemisterService = async (payload: ISemister) => {
const semisterNameCodeWrapper:ISemesterNameCodeWrapper = {
    Autumn:'A01',
    Summer:'S02',
    Fall:'F03'

}
if(semisterNameCodeWrapper[payload.name] !== payload.code){
   throw new Error('invalid semister Code   ' + payload.name)
}

    const result = await Semester.create(payload);
    return result;
  };
  