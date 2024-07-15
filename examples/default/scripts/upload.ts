import { uploadSoFiles, uploadSourcemaps } from 'instabug-reactnative/upload';

const result = await uploadSourcemaps({
  code: 'your-app-code',
  file: 'path-to-your-sourcemap-file',
  platform: 'ios',
  name: 'your-sourcemap-name',
  token: 'your-app-token',
  label: 'your-sourcemap-label',
});

const so = await uploadSoFiles({
  code: 'your-app-code',
  file: 'path-to-your-sourcemap-file',
  platform: 'ios',
  name: 'your-sourcemap-name',
  token: 'your-app-token',
  label: 'your-sourcemap-label',
});

console.log(result);
