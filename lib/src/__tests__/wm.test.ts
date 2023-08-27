import { spawn } from 'child_process'
import { Mock } from 'vitest'
import wm from '../wm'

vi.mock('child_process', () => ({
  spawn: vi.fn(() => ({
    on: vi.fn(),
  })),
}))

const spawnMock = spawn as Mock

const fetchMock = vi.fn()
let globalFetch: typeof fetch
beforeAll(() => {
  globalFetch = global.fetch
  global.fetch = fetchMock
})

afterAll(() => {
  global.fetch = globalFetch
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('start', () => {
  it('should clear existing mappings', async () => {
    await wm.start({ url: 'http://test-wiremock.com' })

    expect(spawnMock).not.toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('http://test-wiremock.com/__admin/mappings', { method: 'DELETE' })
  })

  it('should set up the proxy when supplied', async () => {
    await wm.start({ url: 'http://test-wiremock.com', proxy: 'http://test-proxy.com' })

    expect(spawnMock).not.toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenCalledWith('http://test-wiremock.com/__admin/mappings', {
      method: 'POST',
      body: JSON.stringify({
        request: {
          method: 'ANY',
          urlPattern: '/.*',
        },
        response: {
          proxyBaseUrl: 'http://test-proxy.com',
        },
      }),
    })
  })

  it('should start a container when no url supplied', async () => {
    fetchMock.mockResolvedValueOnce({ status: 404 }).mockResolvedValue({ status: 200 })
    await wm.start({})

    expect(spawnMock).toHaveBeenCalledTimes(1)
    expect(spawnMock).toHaveBeenCalledWith('docker', ['run', '-i', '--rm', '-p', '8080:8080', '--name', 'wiremock-js', 'wiremock/wiremock:2.35.0'])
  })

  it('should set the port for the container', async () => {
    fetchMock.mockResolvedValue({ status: 200 })
    await wm.start({ port: 1234 })

    expect(spawnMock).toHaveBeenCalledTimes(1)
    expect(spawnMock).toHaveBeenCalledWith('docker', ['run', '-i', '--rm', '-p', '1234:8080', '--name', 'wiremock-js', 'wiremock/wiremock:2.35.0'])
  })
})

describe('stop', () => {
  it('should stop the container', async () => {
    fetchMock.mockResolvedValue({ status: 200 })
    await wm.start({})
    wm.stop()

    expect(spawnMock).toHaveBeenCalledWith('docker', ['container', 'stop', 'wiremock-js'])
  })

  it('should clear the mappings when started with a url', async () => {
    fetchMock.mockResolvedValue({ status: 200 })
    await wm.start({ url: 'http://test-wiremock.com' })
    wm.stop()

    expect(fetchMock).toHaveBeenCalledWith('http://test-wiremock.com/__admin/mappings', { method: 'DELETE' })
  })
})
