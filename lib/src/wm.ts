import { spawn } from 'child_process'
import { mock, clearAll } from './mock'
import { waitForWiremock, clearAllMappings, addProxyMapping } from './api'

type StartOptions =
  | {
      port?: number
      proxy?: string
    }
  | {
      url: string
      proxy?: string
    }

const getContainerUrl = (port: number) => `http://0.0.0.0:${port}`
const getWiremockUrl = (moduleOptions: StartOptions) => ('url' in moduleOptions ? moduleOptions.url : getContainerUrl(moduleOptions.port ?? 8080))

const startWiremockInContainer = async (port: number) => {
  // eslint-disable-next-line no-console
  console.log('starting wiremock in container')
  const startProcess = spawn('docker', ['run', '-i', '--rm', '-p', `${port}:8080`, '--name', 'wiremock-js', 'wiremock/wiremock:2.35.0'])
  /* istanbul ignore next -- @preserve */
  startProcess.on('error', err => {
    // eslint-disable-next-line no-console
    console.error('error starting wiremock', err)
  })

  await waitForWiremock(getContainerUrl(port))
}

const stopWiremockContainer = async () =>
  new Promise<void>(resolve => {
    // eslint-disable-next-line no-console
    console.log('stopping wiremock container')
    const stopProcess = spawn('docker', ['container', 'stop', 'wiremock-js'])
    /* istanbul ignore next -- @preserve */
    stopProcess.on('close', () => {
      resolve()
    })
  })

let moduleOptions: StartOptions = {}

const clearAllMocks = async () => {
  const wiremockUrl = 'url' in moduleOptions ? moduleOptions.url : getContainerUrl(moduleOptions.port ?? 8080)
  await clearAllMappings(wiremockUrl)
  if (moduleOptions.proxy) {
    await addProxyMapping(wiremockUrl, moduleOptions.proxy)
  }
}

const stop = async () => {
  if ('url' in moduleOptions) {
    await clearAllMappings(moduleOptions.url)
  } else {
    await stopWiremockContainer()
  }
}

const start = async (options: StartOptions) => {
  moduleOptions = options
  if (!('url' in options)) {
    await startWiremockInContainer(options.port ?? 8080)
  }

  await clearAllMocks()
  clearAll()

  // eslint-disable-next-line no-console
  console.log('wiremock started...')
}

export default { start, stop, clearAllMocks, mock: mock(() => getWiremockUrl(moduleOptions)) }
