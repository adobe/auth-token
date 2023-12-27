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

import { matchRequestUrl } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './auth/handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

export function waitForRequest(method, url) {
  let expectedRequestId = '';

  return new Promise((resolve, reject) => {
    server.events.on('request:start', ({ request, requestId }) => {
      const matchesMethod =
        request.method.toLowerCase() === method.toLowerCase();
      const matchesUrl = matchRequestUrl(new URL(request.url), url).matches;

      if (matchesMethod && matchesUrl) {
        expectedRequestId = requestId;
      }
    });

    server.events.on('request:match', ({ request, requestId }) => {
      if (requestId === expectedRequestId) {
        resolve(request);
      }
    });

    server.events.on('request:unhandled', ({ requestId }) => {
      if (requestId === expectedRequestId) {
        reject(
          new Error(`The ${req.method} ${req.url} request was unhandled.`),
        );
      }
    });
  });
}
