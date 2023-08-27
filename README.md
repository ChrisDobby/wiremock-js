# wiremock-js

This is the `wiremock-js` library.

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

## API

### wm.start([options]) => Promise<void>

Starts a new Wiremock server if required, clears any existing mocks and adds a proxy if required.

#### options

Type: `Object`

startup options for the library

##### url

Type: `string`
Default: `undefined`

The url of an existing Wiremock server, if not supplied then a docker container running a server on port 8080 will be started.

##### port

Type: `number`
Default: `undefined`

Specifies a different port to run the docker container on.

##### proxy?

Type: `string`
Default: `undefined`

Specifies the url of a proxy to be called for any paths that have no explicit mocks set.

### wm.stop() => Promise<void>

Clears any existing mocks and stops the docker container if one was started.

### wm.clearAllMocks

Clears all existing mocks except the proxy if one was supplied.

## Demo

The [demo](./demo/) will start up a docker container running Wiremock and perform some sample integration tests using vitest.

To run it ensure the docker daemon is running and run

```
npm run demo
```
