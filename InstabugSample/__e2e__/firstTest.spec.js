describe('Example', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});
