import { Router } from 'express';
import axios from 'axios';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { code } = request.body;

  try {
    const oauthResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    console.log(oauthResponse.data);

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        accept: 'application/json',
        Authorization: `token ${oauthResponse.data.access_token}`,
      },
    });

    console.log(userResponse.data);

    return response.json(userResponse.data);
  } catch (err) {
    return response.json({ status: 'err' });
  }
});

export default sessionsRouter;
