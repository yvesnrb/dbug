import express from 'express';

const app = express();

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello, Digital Ocean Apps!' });
});

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on port ${process.env.APP_PORT}`);
});
