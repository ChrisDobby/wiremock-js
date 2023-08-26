# @chrisdobby/wiremock-js

This is the `@chrisdobby/wiremock-js` library.

It is designed to give typescript and javascript developers a library to run [Wiremock](https://wiremock.org/) with a familiar API.

The API is based on the [jest mocking API](https://jestjs.io/docs/mock-function-api) so, for instance, you could create a mock for a `GET` request against the `/hello-world` path using `wm.mock('GET', '/hello-world').mockResponse({ statusCode: 200 })`. The full API is listed below.

A CLI is also provided to use to setup/startup wiremock and add/remove mocks.

## API

## CLI
