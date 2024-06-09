/* eslint-disable no-console */
import { Server } from 'http';
import app from './app/app';
import { mongoUrl, port } from './config';
import { connectMongoDB } from './db/dbConnect';

let server: Server;
(async () => {
  try {
    if (mongoUrl) {
      await connectMongoDB(mongoUrl);
      server = app.listen(port, () => {
        console.log(`server is running at ${port}`);
      });
    } else {
      console.error('MongoDB URL is not defined.');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();

process.on('unhandledRejection', (error: any) => {
  console.log(
    `${error.message},\n ⚠️ unahandledRejection is detected ❗, shutting down ...😞😞,`,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', error => {
  console.log(
    `${error.message}, \n ⚠️ uncaughtException is detected ❗ , shutting down ...😞😞`,
  );
  process.exit(1);
});
