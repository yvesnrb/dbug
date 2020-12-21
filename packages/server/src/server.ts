import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on port ${process.env.APP_PORT}`);
});
