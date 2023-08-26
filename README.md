# wiremock-js

This is the monorepo for the wiremock-js library and demo application

Source code for the library is found in the `./lib` directory and for the demo in the `./demo` directory.

Documentation for each can be found in

- [lib](./lib/README.md)
- [demo](./demo/README.md)

## Installation

This repo makes use of [Turbo Repo](https://turborepo.org/) and NPM workspaces to aid with monorepo setup.

Script commands in the monorepo root will run the appropriate scripts in each workspace if they exist
(eg. `npm run lint` will run the `lint` command in both workspaces but `npm run test` will only run in the `lib` workspace)

Install:
`npm i`

Dependencies between commands can also be found in `turbo.json`
