function stringLength(str, maxLength) {
  return str.length <= maxLength;
}

function palindrom(str) {
  let strNormalized = str.replaceAll(' ', '').toLowerCase();
  let strReverse = '';
  for (let i = strNormalized.length - 1; i >= 0; i--) {
    strReverse += strNormalized[i];
  }
  return strReverse === strNormalized;
}
