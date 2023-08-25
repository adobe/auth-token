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

import { auth } from '../../bin/auth';
import { server as mswServer, waitForRequest } from '../../mocks/msw-server.js';
import { TOKEN_EXCHANGE_ENDPOINT, failHandler } from '../../mocks/auth/handlers.js';

describe('oauth', () => {
  test('call the prod endpoint with the expected shape', async () => {
    const clientId = 'abc-client-id';
    const clientSecret = 'def-client-secret';
    const scope = 'openid,AdobeID,read_organizations';
    const environment = 'prod';

    // Establish a request listener but don't resolve it yet.
    const pendingRequest = waitForRequest('POST', TOKEN_EXCHANGE_ENDPOINT)

    // make the call
    await auth({ clientId, clientSecret, scope, environment });

    // Await the request and get its reference.
    const request = await pendingRequest
    const bodyParams = new URLSearchParams(request.body);
    const [ headersSymbolName ] = Object.getOwnPropertySymbols(request.headers);
    expect(request.url.href.includes('ims-na1.adobelogin.com/ims/token/v3')).toBeTruthy();
    expect(request.headers[headersSymbolName]['content-type']).toEqual('application/x-www-form-urlencoded;charset=UTF-8');
    expect(bodyParams.get('grant_type')).toEqual('client_credentials');
    expect(bodyParams.get('client_id')).toEqual(clientId);
    expect(bodyParams.get('client_secret')).toEqual(clientSecret);
    expect(bodyParams.get('scope')).toEqual(scope);
  });

  test('call the stage endpoint with the expected shape', async () => {
    const clientId = 'abc-client-id';
    const clientSecret = 'def-client-secret';
    const scope = 'openid,AdobeID,read_organizations';
    const environment = 'stage';

    // Establish a request listener but don't resolve it yet.
    const pendingRequest = waitForRequest('POST', TOKEN_EXCHANGE_ENDPOINT)

    // make the call
    await auth({ clientId, clientSecret, scope, environment });

    // Await the request and get its reference.
    const request = await pendingRequest
    const bodyParams = new URLSearchParams(request.body);
    const [ headersSymbolName ] = Object.getOwnPropertySymbols(request.headers);
    expect(request.url.href.includes('ims-na1-stg1.adobelogin.com/ims/token/v3')).toBeTruthy();
    expect(request.headers[headersSymbolName]['content-type']).toEqual('application/x-www-form-urlencoded;charset=UTF-8');
    expect(bodyParams.get('grant_type')).toEqual('client_credentials');
    expect(bodyParams.get('client_id')).toEqual(clientId);
    expect(bodyParams.get('client_secret')).toEqual(clientSecret);
    expect(bodyParams.get('scope')).toEqual(scope);
  });

  test('call the stage endpoint with the expected shape', async () => {
    const clientId = 'abc-client-id';
    const clientSecret = 'def-client-secret';
    const scope = 'openid,AdobeID,read_organizations';
    const environment = 'stage';

    const access_token = await auth({
      clientId,
      clientSecret,
      scope,
      environment,
    });
    expect(access_token).toEqual('12345-success-token');
  });

  test("throws an error when the response doesn't have an access token", async () => {
    mswServer.use(failHandler);

    await expect(() => auth({}))
      .rejects
      .toThrowError('There was a problem exchanging a token')
  });
});
