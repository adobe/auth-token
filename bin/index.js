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
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { auth } from './auth';
const argv = yargs(hideBin(process.argv))
    .scriptName('@adobe/ims-programmatic-auth')
    .usage('Usage: $0 [options]')
    .options({
    'client-id': {
        type: 'string',
        description: 'the client id of your server-to-server credential',
        demandOption: true
    },
    'client-secret': {
        type: 'string',
        description: 'the client secret of your server-to-server credential',
        demandOption: true
    },
    scope: {
        type: 'string',
        description: 'a comma-separated list of scopes to request (e.g. openid,AdobeID,read_organizations,....)',
        demandOption: true
    },
    environment: {
        type: 'string',
        describe: 'The environment to grab an access token from',
        choices: ['prod', 'stage'],
        default: 'prod',
        demandOption: true
    },
    verbose: {
        alias: 'v',
        type: 'boolean'
    }
})
    .epilogue('For more information, see https://www.npmjs.com/package/@adobe/ims-programmatic-auth.')
    .parseSync();
(async () => {
    try {
        const args = {
            clientId: argv['client-id'],
            clientSecret: argv['client-secret'],
            scope: argv.scope,
            environment: argv.environment
        };
        const accessToken = await auth(args);
        if (argv.verbose || argv.v) {
            console.log(chalk.green(accessToken));
        }
        return accessToken;
    }
    catch (e) {
        console.error(chalk.red(e));
    }
})();
