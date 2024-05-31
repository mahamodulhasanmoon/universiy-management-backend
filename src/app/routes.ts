import { NextFunction, Request, Response, Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicRoutes } from '../modules/semister/semister.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { DepertmentRoutes } from '../modules/depertment/depertment.routes';
const routes = Router();

routes.get('/health', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'success',
    });
  } catch (error) {
    next(error);
  }
});

const modulerRoutes = [
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semister',
    route: academicRoutes,
  },
  {
    path: '/academic-faculty',
    route: facultyRoutes,
  },
  {
    path: '/academic-depertment',
    route: DepertmentRoutes,
  },
];

modulerRoutes.forEach(({ path, route }) => routes.use(path, route));

export default routes;
