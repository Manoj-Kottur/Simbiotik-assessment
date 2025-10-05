module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }]
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    testMatch: ['**/+(*.)+(spec).+(ts)']
};