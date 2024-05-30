import { ISemister } from "./semister.interface";
import { Semester } from "./semister.model";

export const createSemisterService = async (data: ISemister) => {
    const result = await Semester.create(data);
    return result;
  };
  