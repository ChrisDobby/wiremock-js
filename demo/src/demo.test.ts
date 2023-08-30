import { wm } from '@chrisdobby/wiremock-js'

describe('wm exists', () => {
  beforeAll(async () => {
    await wm.start({ proxy: 'https://hacker-news.firebaseio.com/v0/item/' })
  })

  afterAll(async () => {
    await wm.stop()
  })

  beforeEach(async () => {
    await wm.clearAllMocks()
    await wm
      .mock('GET', '/hello-world')
      .mockResponse({ status: 200, body: { message: 'Hello World' } })
      .map()
  })

  it('should use the proxy for unmatched requests', async () => {
    const response = await fetch('http://0.0.0.0:8080/something')

    expect(response.status).toEqual(200)
  })

  it('should use mapping', async () => {
    const response = await fetch('http://0.0.0.0:8080/hello-world')

    expect(response.status).toEqual(200)
    const body = await response.json()
    expect(body.message).toEqual('Hello World')
  })
})
