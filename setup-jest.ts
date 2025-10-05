// Attempt to initialize Angular testing environment in a way that
// tolerates ESM/CJS module shape differences across package versions.
try {
  // Prefer preset initialization when available
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('jest-preset-angular/setup-jest');
  } catch (e) {
    // If preset isn't available or throws, fall through to manual init
  }

  Object.defineProperty(window, 'CSS', { value: null });

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Try manual TestBed init if preset didn't do it
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ngCoreTesting = require('@angular/core/testing');
    const pbdTesting = require('@angular/platform-browser-dynamic/testing');
    if (ngCoreTesting && ngCoreTesting.getTestBed && pbdTesting) {
      ngCoreTesting.getTestBed().initTestEnvironment(
        pbdTesting.BrowserDynamicTestingModule,
        pbdTesting.platformBrowserDynamicTesting()
      );
    }
  } catch (err) {
    // last resort: ignore and let individual tests configure TestBed
  }
} catch (err) {
  // If anything in setup fails, still provide the minimal mocks
  Object.defineProperty(window, 'CSS', { value: null });
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
