import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  assignCourseFacultyService,
  createCourseService,
  deleteCourseByIdService,
  getAllCourseService,
  getCourseByIdService,
  removeCourseFacultyService,
  updateCourseByIdService,
} from './course.service';

export const createCourseController: RequestHandler = catchAsync(
  async (req, res) => {
    const courseData = req.body;

    const data = await createCourseService(courseData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created Course',
      data: data,
    });
  },
);

export const getAllCourseController: RequestHandler = async (req, res) => {
  const result = await getAllCourseService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Courses fetch successfully',
    data: result,
  });
};

export const getCourseByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await getCourseByIdService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Course fetch successfully',
    data: result,
  });
};

export const updateCourseByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateCourseByIdService(id, data);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Course fetch successfully',
    data: result,
  });
};

export const deleteCourseByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await deleteCourseByIdService(id as string);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Course delete successfully',
    data: result,
  });
};

export const assignFacultiesController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;

  const result = await assignCourseFacultyService(id, faculties);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Course delete successfully',
    data: result,
  });
};
export const removeFacultyController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;

  const result = await removeCourseFacultyService(id, faculties);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Course delete successfully',
    data: result,
  });
};
