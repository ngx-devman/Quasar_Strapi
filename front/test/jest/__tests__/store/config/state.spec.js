const mockTrue = { target: 'local_develop' }
const mockFalse = { target: null }

describe('test state.js', () => {
  const windowModulePath = "../../../../../window"
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })
  test('test server, pulse, host on local_develop', () => {
    jest.mock('../../../../../src/boot/config', () => mockTrue)
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('https://api-dev.sourcesync.io/')
    expect(state.pulse).toEqual('https://api-dev.sourcesync.io/pulses/')
    expect(state.host).toEqual('http://localhost:8080/#/')
  })
  test('test server, pulse, host on localhost', () => {
    jest.mock('../../../../../src/boot/config', () => mockFalse)
    jest.mock(windowModulePath, () => ({
      window: {
        SourceDigital: { build: { target: 'localhost' } },
        location: { href: 'test.com' }
      }
    }))
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('http://localhost:1337/')
    expect(state.pulse).toEqual('http://localhost:1337/pulses/')
    expect(state.host).toEqual('http://localhost:8080/#/')
  })
  test('test server, pulse, host on dev', () => {
    jest.mock('../../../../../src/boot/config', () => mockFalse)
    jest.mock(windowModulePath, () => ({
      window: {
        SourceDigital: { build: { target: 'development' } },
        location: { href: 'test.com' }
      }
    }))
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('https://api-dev.sourcesync.io/')
    expect(state.pulse).toEqual('https://api-dev.sourcesync.io/pulses/')
    expect(state.host).toEqual('https://experience-dev.sourcesync.io/#/')
  })
  test('test test server, pulse, host on staging', () => {
    jest.mock('../../../../../src/boot/config', () => mockFalse)
    jest.mock(windowModulePath, () => ({
      window: {
        SourceDigital: { build: { target: 'staging' } },
        location: { href: 'test.com' }
      }
    }))
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('https://api-stg.sourcesync.io/')
    expect(state.pulse).toEqual('https://api-stg.sourcesync.io/pulses/')
    expect(state.host).toEqual('https://experience-stg.sourcesync.io/#/')
  })
  test('test test server, pulse, host on unstable', () => {
    jest.mock('../../../../../src/boot/config', () => mockFalse)
    jest.mock(windowModulePath, () => ({
      window: {
        SourceDigital: { build: { target: 'unstable' } },
        location: { href: 'test.com' }
      }
    }))
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('https://api-unstable.sourcesync.io/')
    expect(state.pulse).toEqual('https://api-unstable.sourcesync.io/pulses/')
    expect(state.host).toEqual('https://experience-unstable.sourcesync.io/#/')
  })
  test('test test server, pulse, host on production', () => {
    jest.mock('../../../../../src/boot/config', () => mockFalse)
    jest.mock(windowModulePath, () => ({
      window: {
        SourceDigital: { build: { target: 'production' } },
        location: { href: 'test.com' }
      }
    }))
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('https://api.sourcesync.io/')
    expect(state.pulse).toEqual('https://api.sourcesync.io/pulses/')
    expect(state.host).toEqual('https://experience.sourcesync.io/#/')
  })
  test('test test server, pulse, host on prime', () => {
    jest.mock('../../../../../src/boot/config', () => mockFalse)
    jest.mock(windowModulePath, () => ({
      window: {
        SourceDigital: { build: { target: 'prime' } },
        location: { href: 'test.com' }
      }
    }))
    const state = require('../../../../../src/store/config/state').default
    expect(state.server).toEqual('https://api-prime.sourcesync.io/')
    expect(state.pulse).toEqual('https://api-prime.sourcesync.io/pulses/')
    expect(state.host).toEqual('https://prime.sourcesync.io/#/')
  })
})
