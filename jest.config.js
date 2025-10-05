export default {
    // Use ts-jest ESM preset so tests and Angular ESM bundles are handled as ESM
    preset: 'ts-jest/presets/default-esm',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
            useESM: true
        }
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
        '^.+\\.mjs$': 'esbuild-jest',
        '^.+\\.js$': 'babel-jest'
    },
    // Treat TypeScript test files as ESM so imports map to Angular's ESM bundles
    extensionsToTreatAsEsm: ['.ts'],
    // transform ESM packages from @angular, rxjs and zone.js
    transformIgnorePatterns: ['node_modules/(?!(?:@angular|rxjs|zone.js)/)'],
    moduleNameMapper: {
        '\\.(css|html)$': '<rootDir>/test-file-stub.js',
        '^@angular/core$': '<rootDir>/node_modules/@angular/core/fesm2022/core.mjs',
        '^@angular/common$': '<rootDir>/node_modules/@angular/common/fesm2022/common.mjs',
        '^@angular/router$': '<rootDir>/node_modules/@angular/router/fesm2022/router.mjs',
        '^@angular/forms$': '<rootDir>/node_modules/@angular/forms/fesm2022/forms.mjs',
        '^@angular/platform-browser$': '<rootDir>/node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs',
        '^@angular/platform-browser-dynamic$': '<rootDir>/node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs'
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    testMatch: ['**/+(*.)+(spec).+(ts)']
};