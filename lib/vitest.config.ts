export default {
  test: {
    testTimeout: 10000,
    globals: true,
    deps: {
      interopDefault: true,
    },
    coverage: {
      all: true,
      provider: 'istanbul',
      enabled: true,
      include: ['**/src/**/*.ts', '**/src/**/*.tsx'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
    reporters: ['default', 'junit'],
    outputFile: `./reports/wiremock-js.xml`,
    environment: 'node',
  },
}
