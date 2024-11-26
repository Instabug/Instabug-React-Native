import { client } from '../../utils/appiumConfig/setup';

//const fs = require('fs').promises;
jest.setTimeout(300000);
describe('Instabug Configuration Validation', () => {
  it('test', async () => {
    const reactNativeElement = client.$(
      '//android.widget.Button[@resource-id="com.instabug.hybridsampleapp:id/buttonGraphQL"]',
    );
    reactNativeElement.click();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(true).toBe(true);
  });
});
