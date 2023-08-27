import { wm } from '..'

describe('wm exists', () => {
  it('should be defined', () => {
    expect(wm).toBeDefined()
    expect(wm.start).toBeDefined()
    expect(wm.stop).toBeDefined()
    expect(wm.clearAllMocks).toBeDefined()
  })
})
