// test-setup.js or your main test file
import { remote } from 'webdriverio';
import { capabilities } from './e2e-config';
import { beforeAll, afterAll } from '@jest/globals';

export let client: any;

const config = {
  hostname: 'localhost',
  path: '/', // Adjust if necessary
  port: 4724,
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

