[![Version](https://img.shields.io/npm/v/@adobe/ims-programmatic-auth.svg)](https://npmjs.org/package/@adobe/ims-programmatic-auth)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/ims-programmatic-auth.svg)](https://npmjs.org/package/@adobe/ims-programmatic-auth)
[![codecov](https://codecov.io/gh/adobe/ims-programmatic-auth/branch/master/graph/badge.svg)](https://codecov.io/gh/adobe/ims-programmatic-auth)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/ims-programmatic-auth.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/ims-programmatic-auth/context:javascript)

# ims-programmatic-auth

Retrieve an Adobe access token through the 2-legged Oauth server-to-server flow

## Goals

Instead of every developer who wants to use the Oauth server-to-server flow to retrieve an auth token from Adobe having to write their own implementation of this flow this package is intended to replace this need with one method call.

### Installation

Instructions for how to download/install the code onto your machine.

Example:

```
npm install --save @adobe/ims-programmatic-auth
```

### Common Usage

Usage instructions for your code.

Promise based example:

```javascript
const auth = require("@adobe/ims-programmatic-auth");

auth(config)
  .then((tokenResponse) => console.log(tokenResponse))
  .catch((error) => console.log(error));
```

Async/Await based example:

```javascript
const auth = require("@adobe/ims-programmatic-auth");

let tokenResponse = await auth(config);
console.log(tokenResponse);
```

or (if you don't care about the other properties in the token response)

```javascript
const auth = require("@adobe/ims-programmatic-auth");

let { access_token } = await auth(config);
console.log(access_token);
```

#### Config object

The config object is where you pass in all the required and optional parameters to the `auth` call.

| parameter    | integration name | required | type                                    | Accepted Option |
|--------------|------------------| -------- |-----------------------------------------|-----------------|
| clientId     | Client ID        | true     | String                                  |                 |
| clientSecret | Client Secret    | true     | String                                  |                 |
| scope        | scope            | true     | Comma separated String or Array<String> |                 |
| env          |                  | false    | String                                  | prod OR stage   |

In order to determine which **scope** you need to register for you can look them up by product in this [handy table](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/Scopes.md).

For instance if you need to be authenticated to call API's for both GDPR and User Management you would [look them up](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/Scopes.md) and find that they are:

- GDPR: https://ims-na1.adobelogin.com/s/ent_gdpr_sdk
- User Management: https://ims-na1.adobelogin.com/s/ent_user_sdk

Then you would create an array of **metaScopes** as part of the config object. For instance:

```javascript
const config = {
  clientId: "asasdfasf",
  clientSecret: "aslfjasljf-=asdfalasjdf==asdfa",
  scope: ["ent_dataservices_sdk", "reactor_publisher"],
  env: "stage"
};
```

#### Response Object

The response object contains three keys:

- `token_type`
- `access_token`
- `expires_in`

#### Example

```javascript
const auth = require("@adobe/ims-programmatic-auth");
const fs = require("fs");

const config = {
  clientId: "asasdfasf",
  clientSecret: "aslfjasljf-=asdfalasjdf==asdfa",
  scope: "ent_dataservices_sdk",
};

auth(config)
  .then((response) => console.log(response['access_token']))
  .catch((error) => console.log(error));
```

### Contributing

Contributions are welcomed! Read the [Contributing Guide](.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.