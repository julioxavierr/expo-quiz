require('jest-fetch-mock').enableMocks();

global.AbortController = () => ({
  signal: {
    addEventListener: () => {},
  },
  abort: () => {},
});
