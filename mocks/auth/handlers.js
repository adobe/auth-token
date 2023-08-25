import { rest } from 'msw';

export const TOKEN_EXCHANGE_ENDPOINT = '*/ims/token/v3*';

const successHandler = rest.post(TOKEN_EXCHANGE_ENDPOINT, (req, res, ctx) => {
  return res(
    // Respond with a 200 status code
    ctx.status(200),
    ctx.json({ access_token: '12345-success-token' })
  );
});

export const failHandler = rest.post(TOKEN_EXCHANGE_ENDPOINT, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({ message: 'There was a problem exchanging a token' })
  );
});

export const handlers = [successHandler];
