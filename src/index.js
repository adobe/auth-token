#!/usr/bin/env node
import auth from './auth.js'
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk';

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
    'scope': {
      type: 'string',
      description: 'a comma-separated list of scopes to request (e.g. openid,AdobeID,read_organizations,....)',
      demandOption: true
    },
    'verbose': {
      alias: 'v',
      type: 'boolean'
    }
  })
  .epilogue('For more information, see https://www.npmjs.com/package/@adobe/ims-programmatic-auth.')
  .parseSync();

(async () => {
  try {
    const args = {
      // @ts-ignore
      clientId: argv['client-id'],
      // @ts-ignore
      clientSecret: argv['client-secret'],
      // @ts-ignore
      scope: argv.scope
    };

    const accessToken = await auth(args);

    if (argv.verbose || argv.v) {
      // TODO
      // @ts-ignore
      console.log(chalk.green(accessToken));
    }

    return accessToken
  } catch (e) {
    // TODO
    // @ts-ignore
    console.error(chalk.red(e));
  }
})();
