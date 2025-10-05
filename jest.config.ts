import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  }
};

export default config;
