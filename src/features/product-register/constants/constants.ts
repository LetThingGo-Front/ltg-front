const timeList = [
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

/**
 *  요일 코드
 *  8: 주중
 * 9: 주말
 * 1~5 : 월~금
 * 6: 토
 * 7: 일
 */
const WEEKDAYS_CODE = "8";
const WEEKENDS_CODE = "9";
const WEEKDAYS_REGEX = /[1-5]/;
const WEEKEND_REGEX = /[6-7]/;

export {
  timeList,
  WEEKDAYS_CODE,
  WEEKENDS_CODE,
  WEEKDAYS_REGEX,
  WEEKEND_REGEX,
};
