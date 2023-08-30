import { randomUUID } from 'crypto'
import { addMapping } from './api'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
type Response = Parameters<typeof addMapping>[3]

const mocks = new Map<string, { httpMethod: HttpMethod; path: string; responses: Response[] }>()

const map = (id: string, getApiUrl: () => string) => async () => {
  const mock = mocks.get(id)
  if (mock) {
    await Promise.all(mock?.responses.map(response => addMapping(getApiUrl(), mock.httpMethod, mock.path, response)))
  }
  return { id }
}

const mockResponse = (id: string, getApiUrl: () => string) => (response: Response) => {
  const mock = mocks.get(id)
  mock?.responses.push(response)
  return {
    id,
    map: map(id, getApiUrl),
  }
}

export const clearAll = () => {
  mocks.clear()
}

export const mock = (getApiUrl: () => string) => (httpMethod: HttpMethod, path: string) => {
  const id = randomUUID()
  mocks.set(id, { httpMethod, path, responses: [] })
  return { id, mockResponse: mockResponse(id, getApiUrl) }
}
