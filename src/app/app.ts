import express, { Application } from 'express';
import middleware from './middleware';
import routes from './routes';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import { errorHandler, notFoundHandler } from './errors';
const app: Application = express();
const doc = YAML.load(`${process.cwd()}/src/docs/swagger.yaml`);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(doc));

app.use(middleware);
app.use('/api/v1', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
