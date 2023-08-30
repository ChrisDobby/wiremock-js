type Response = { status: number; headers?: Record<string, string>; body?: unknown }

export const clearAllMappings = async (url: string) => {
  // eslint-disable-next-line no-console
  console.log(`removing existing mappings from ${url}`)
  await fetch(`${url}/__admin/mappings`, { method: 'DELETE' })
}

export const addMapping = (apiUrl: string, method: string, path: string, { status, body, headers }: Response) =>
  fetch(`${apiUrl}/__admin/mappings`, {
    method: 'POST',
    body: JSON.stringify({
      request: {
        method,
        url: path,
      },
      response: {
        status,
        jsonBody: body,
        headers,
      },
    }),
  })

export const addProxyMapping = async (url: string, proxy: string) => {
  // eslint-disable-next-line no-console
  console.log(`adding mapping for the proxy ${proxy} to ${url}`)
  await fetch(`${url}/__admin/mappings`, {
    method: 'POST',
    body: JSON.stringify({
      request: {
        method: 'ANY',
        urlPattern: '/.*',
      },
      response: {
        proxyBaseUrl: proxy,
      },
    }),
  })
}

export const waitForWiremock = async (url: string) =>
  new Promise<void>(resolve => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${url}/__admin/mappings`)
        if (response.status === 200) {
          clearInterval(interval)
          resolve()
        }
      } catch (e) {
        // ignore
      }
    }, 1000)
  })
