[![Version](https://img.shields.io/npm/v/@adobe/auth-token.svg)](https://npmjs.org/package/@adobe/auth-token)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/auth-token.svg)](https://npmjs.org/package/@adobe/auth-token)
[![codecov](https://codecov.io/gh/adobe/auth-token/branch/master/graph/badge.svg)](https://codecov.io/gh/adobe/auth-token)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/auth-token.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/auth-token/context:javascript)

# auth-token

Retrieve an Adobe access token through the 2-legged Oauth server-to-server flow

## Goals

Instead of every developer who wants to use the Oauth server-to-server flow to retrieve an auth token from Adobe having to write their own implementation of this flow this package is intended to replace this need with one method call.

### Installation

Instructions for how to download/install the code onto your machine.

Example:

```
npm install --save @adobe/auth-token
```

### Common Usage

#### Config object

The config object is where you pass in all the required and optional parameters to the `auth` call.

| parameter    | integration name | required | type                                    | Accepted Option |
|--------------|------------------| -------- |-----------------------------------------|-----------------|
| clientId     | Client ID        | true     | String                                  |                 |
| clientSecret | Client Secret    | true     | String                                  |                 |
| scope        | scope            | true     | Comma separated String or Array<String> |                 |
| env          |                  | false    | String                                  | prod OR stage   |

Usage instructions for your code.

#### Importing @adobe/auth-token

This library is ESM first:

```javascript
import { auth } from '@adobe/auth-token';
```

Usage in CommonJS modules:

```javascript
const auth = (...args) => import('@adobe/auth-token').then(({ auth: adobeAuth }) => adobeAuth(...args));
```

Promise-based example:

```javascript
import { auth } from '@adobe/auth-token';
const config = {
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
    scope: "your-scopes"
}

auth(config)
  .then((tokenResponse) => console.log(tokenResponse))
  .catch((error) => console.log(error));
```

Async/Await based example:

```javascript
import { auth } from '@adobe/auth-token';
const config = {
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  scope: "your-scopes"
}

const { access_token, token_type, expires_in } = await auth(config);
```

In order to determine which **scope** you need to register for you can look them up by product [here](https://developer.adobe.com/developer-console/docs/guides/authentication/UserAuthentication/implementation/#oauth-20-scopes).

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

### Contributing

Contributions are welcomed! Read the [Contributing Guide](.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.