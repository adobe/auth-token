#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const yargs_1 = require("yargs");
const helpers_1 = require("yargs/helpers");
// import chalk from 'chalk';
// TODO
// @ts-ignore
const chalk = (...args) => Promise.resolve().then(() => require('chalk')).then(({ default: chalk }) => chalk(...args));
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const args = {
            // @ts-ignore
            clientId: argv['client-id'],
            // @ts-ignore
            clientSecret: argv['client-secret'],
            // @ts-ignore
            scope: argv.scope
        };
        const accessToken = yield (0, auth_1.default)(args);
        if (argv.verbose || argv.v) {
            // TODO
            // @ts-ignore
            console.log(chalk.green(accessToken));
        }
        return accessToken;
    }
    catch (e) {
        // TODO
        // @ts-ignore
        console.error(chalk.red(e));
    }
}))();
