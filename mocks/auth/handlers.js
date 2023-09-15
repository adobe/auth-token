/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

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
