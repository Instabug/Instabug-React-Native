const fs = require('fs').promises;

describe('Instabug Configuration Validation', () => {
  let configData: any;

  beforeAll(async () => {
    try {
      const jsonData = await fs.readFile('./captured_response.json');
      configData = JSON.parse(jsonData);
    } catch (error) {
      console.error('Error reading ecomplete_response.json:', error);
      throw error;
    }
  });

  test('should contain correct session replay URL in configuration', () => {
    expect(configData).toHaveProperty('session_replay');

    expect(configData.session_replay).toHaveProperty('url');

    const expectedUrl =
      'https://dream11.instabug.com/applications/dream11/production/session-replay';
    expect(configData.session_replay.url).toBe(expectedUrl);
  });
});
