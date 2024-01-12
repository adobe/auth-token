#!/usr/bin/env node

/*!
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk';
import inquirer from 'inquirer';
import { auth } from './auth.js'
import envConfig from './envConfig.json';

const authSchemes = ['oauth-server-to-server'];

const argv = yargs(hideBin(process.argv))
  .scriptName('@adobe/ims-programmatic-auth')
  .usage('Usage: $0 [options]')
  .options({
    'client-id': {
      type: 'string',
      description: 'For authentication using an Adobe I/O integration. Your Client ID. You can find this on the overview screen for the integration you have created within the Adobe I/O console (https://console.adobe.io). Optionally, rather than passing the Client ID as a command line argument, it can instead be provided by setting one of the following environment variables, depending on the environment that will be receiving the extension package: REACTOR_IO_INTEGRATION_CLIENT_ID_DEVELOPMENT, REACTOR_IO_INTEGRATION_CLIENT_ID_STAGE, REACTOR_IO_INTEGRATION_CLIENT_ID'
    },
    'client-secret': {
      type: 'string',
      description: 'For authentication using an Adobe I/O integration. Your Client Secret. You can find this on the overview screen for the integration you have created within the Adobe I/O console (https://console.adobe.io). Optionally, rather than passing the Client Secret as a command line argument, it can instead be provided by setting one of the following environment variables, depending on the environment that will be receiving the extension package: REACTOR_IO_INTEGRATION_CLIENT_SECRET_DEVELOPMENT, REACTOR_IO_INTEGRATION_CLIENT_SECRET_STAGE, REACTOR_IO_INTEGRATION_CLIENT_SECRET',
    },
    scope: {
      type: 'string',
      description: 'a comma-separated list of scopes to request (e.g. openid,AdobeID,read_organizations,....)',
      demandOption: true
    },
    environment: {
      type: 'string',
      describe: 'The environment to grab an access token from',
      choices: ['development', 'stage', 'production'],
      default: 'production'
    },
    'auth-scheme': {
      type: 'string',
      description: 'The method to obtain an access token',
      choices: authSchemes,
      default: 'oauth-server-to-server',
    },
    verbose: {
      alias: 'v',
      type: 'boolean'
    }
  })
  .epilogue('For more information, see https://www.npmjs.com/package/@adobe/ims-programmatic-auth.')
  .parseSync();

(async () => {
  // in the future, there may be additional auth schemes other than oauth-server-to-server
  if (!authSchemes.includes(argv['auth-scheme'])) {
    console.error('Unknown auth scheme: ' + argv['auth-scheme']);
    return;
  }

  const environment = argv.environment || 'production';
  // @ts-ignore
  const environmentConfig = envConfig[environment];
  let clientId = argv.clientId || process.env[environmentConfig.clientIdEnvVar] || '';
  if (!clientId?.length) {
    ({ clientId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'clientId',
        message: 'What is your clientId?',
        validate: true
      }
    ]));
  }
  let clientSecret = argv.clientSecret || process.env[environmentConfig.clientSecretEnvVar] || '';
  if (!clientSecret?.length) {
    ({ clientSecret } = await inquirer.prompt([
      {
        type: 'input',
        name: 'clientSecret',
        message: 'What is your clientSecret?',
        validate: true
      }
    ]));
  }

  try {
    const args = {
      clientId,
      clientSecret,
      scope: argv.scope,
      environment
    };

    // expecting tokenResponse = { access_token, token_type, expires_in }
    const tokenResponse = await auth(args);

    if (argv.verbose || argv.v) {
      console.log(chalk.green(JSON.stringify(tokenResponse)));
    }

    return tokenResponse
  } catch (e) {
    console.error(chalk.red(e));
  }
})();
