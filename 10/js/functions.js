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

function isMeetingWithinTheWorkingDay (startWorkDay, endWorkDay, startMeeting, durationMeeting) {
  function conversionToMinutes (time) {

    const parts = time.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    return hours * 60 + minutes;
  }

  const startWorkDayInMinutes = conversionToMinutes(startWorkDay);
  const endWorkDayInMinutes = conversionToMinutes(endWorkDay);
  const startMeetingInMinutes = conversionToMinutes(startMeeting);
  const endMeetingInMinutes = startMeetingInMinutes + durationMeeting;

  return startMeetingInMinutes >= startWorkDayInMinutes && endMeetingInMinutes <= endWorkDayInMinutes;
}
