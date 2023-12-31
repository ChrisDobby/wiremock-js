# @chrisdobby/wiremock-js

![Release workflow](https://github.com/ChrisDobby/wiremock-js/actions/workflows/release.yaml/badge.svg)
[![npm version](https://badge.fury.io/js/@chrisdobby%2Fwiremock-js.svg)](https://badge.fury.io/js/@chrisdobby%2Fwiremock-js)

This is the `@chrisdobby/wiremock-js` library.

It is designed to give typescript and javascript developers a library to run [Wiremock](https://wiremock.org/) with a familiar API.

The API is based on the [jest mocking API](https://jestjs.io/docs/mock-function-api) so, for instance, you could create a mock for a `GET` request against the `/hello-world` path using `wm.mock('GET', '/hello-world').mockResponse({ statusCode: 200 })`. The full API is listed below.

## Installation

To install the package use

```
npm install @chrisdobby/wiremock-js
```

## Getting started

The package can be imported using

```typescript
import { wm } from '@chrisdobby/wiremock-js
```

`wiremock-js` can either use an existing Wiremock server or will start a docker container running a wiremock server.

To start `wiremock-js` to use an existing server a `url` must be passed to the `wm.start` function

```typescript
wm.start({ url: 'http://my-wiremock-server' })
```

To start `wiremock-js` by running wiremock in docker

```typescript
wm.start({})
```

When you have finished call `wm.stop()` to clear all mappings and, if a docker container was started, shut it down.

To add a single mock response use

```typescript
wm.mock('GET', '/hello-world').mockResponse({ status: 200 }).map()
```

## API

### wm.start([options]) => Promise&lt;void&gt;

Starts a new Wiremock server if required, clears any existing mocks and adds a proxy if required.

#### options

Type: `Object`<br>
Default: `{}`

startup options for the library

##### url

Type: `string`<br>
Default: `undefined`

The url of an existing Wiremock server, if not supplied then a docker container running a server on port 8080 will be started.

##### port

Type: `number`<br>
Default: `undefined`

Specifies a different port to run the docker container on.

##### proxy

Type: `string`<br>
Default: `undefined`

Specifies the url of a proxy to be called for any paths that have no explicit mocks set.

### wm.stop() => Promise&lt;void&gt;

Clears any existing mocks and stops the docker container if one was started.

### wm.clearAllMocks() => Promise&lt;void&gt;

Clears all existing mocks except the proxy if one was supplied.

### wm.mock([httpMethod], [path]) => WmMock

#### httpMethod

Type: `'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'`<br>

Specifies the http method that the mock refers to.

#### path

Type: `string`<br>

Specifies the path that the mock refers to.

### Mock.mockResponse([response])

#### response

Type: `Object`<br>

Response object

##### status

Type: `number`<br>

The http status code for the response

##### headers

Type: `Object`<br>
Default: `undefined`

The response headers

##### body

Type: `Object`<br>
Default: `undefined`

The response body

## Demo

The [demo](../demo/) will start up a docker container running Wiremock and perform some sample integration tests using vitest.

To run it ensure the docker daemon is running and run

```
npm run build
npm run demo
```
