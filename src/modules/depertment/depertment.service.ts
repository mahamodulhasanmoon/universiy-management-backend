import { IDepertment } from "./depertment.interface";
import { Depertment } from "./depertment.model";


export const createDepertmentService = async (payload: IDepertment) => {

  const result = await Depertment.create(payload);
  return result;
};

export const getAllDepertmentService = async () => {
  const result = await Depertment.find({});
  return result;
};

export const getDepertmentByIdService = async (id: string) => {
  const result = await Depertment.findById(id);
  return result;
};

// Update Semester

export const updateDepertmentService = async (
  id: string,
  payload: Partial<IDepertment>,
) => {


  const result = await Depertment.updateOne(
    { _id: id },
    { $set: payload },
    { upsert: true },
  );

  return result;
};
