#! /usr/bin/env node

import figlet from 'figlet'
import { Command } from 'commander'

// eslint-disable-next-line no-console
console.log(figlet.textSync('wiremock-js'))

// eslint-disable-next-line no-unused-vars
const program = new Command()
program
  .name('wmjs')
  .command('start')
  .description('Start wiremock')
  .option('-u, --url <string>', 'url of the wiremock server, if not supplied will start wiremock in a docker container')
  .option('-p, --port <number>', 'port to start wiremock on, ignored if url is supplied')
  .option('-x, --proxy <string>', 'proxy to use for requests that are not being mocked')
  .action(options => {
    // eslint-disable-next-line no-console
    console.log(options)
  })

program.parse(process.argv)
