// test-setup.js or your main test file
import { remote } from 'webdriverio';
import { capabilities } from './e2e-config';
import { beforeAll, afterAll } from '@jest/globals';

export let client: any;

const config = {
  hostname: 'localhost',
  path: '/', // Adjust if necessary
  capabilities: {
    ...capabilities,
  },
  connectionRetryCount: 0,
  framework: 'jest',
};

beforeAll(async () => {
  client = await remote(config);
}, 150000);

afterAll(async () => {
  if (client) {
    await client.deleteSession();
  }
});
// jest.setup.js or at the beginning of your test files
const axios = require('axios');

// Set default proxy settings
axios.defaults.proxy = {
  host: 'localhost',
  port: 8080,
};

// Alternatively, set environment variables
process.env.HTTP_PROXY = 'http://localhost:8080';
process.env.HTTPS_PROXY = 'http://localhost:8080';
