export function getId(idObj) {
  if (device.getPlatform() === 'ios') {
    return idObj.IOS;
  }
  return idObj.ANDROID;
}

export default {
  getId,
};