"use strict";
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
// https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html
// import fetch from 'node-fetch';
// TODO
// @ts-ignore
const fetch = (...args) => Promise.resolve().then(() => require('node-fetch')).then(({ default: fetch }) => fetch(...args));
function auth({ clientId, clientSecret, scope }) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
        const url = 'https://ims-na1-stg1.adobelogin.com/ims/token/v3';
        const method = 'POST';
        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        body.append('client_id', clientId);
        body.append('client_secret', clientSecret);
        body.append('scope', scope);
        const response = yield fetch(url, { headers, method, body: body.toString() });
        const responseBody = yield response.json();
        if (!(responseBody === null || responseBody === void 0 ? void 0 : responseBody['access_token'])) {
            throw new Error(JSON.stringify(responseBody));
        }
        return responseBody['access_token'];
    });
}
exports.default = auth;
