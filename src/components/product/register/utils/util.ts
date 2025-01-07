// stirng time 배열을 시간 순으로 정렬하는 함수
const timeArrSort = (arr: string[]) => {
  return arr.sort((a, b) => {
    const [aHour, aMinute] = a.split(":").map(Number);
    const [bHour, bMinute] = b.split(":").map(Number);

    if (aHour === bHour) {
      return aMinute - bMinute;
    } else {
      return aHour - bHour;
    }
  });
};

const dayToStrNumber = (day: string) => {
  switch (day) {
    case "월":
      return "1";
    case "화":
      return "2";
    case "수":
      return "3";
    case "목":
      return "4";
    case "금":
      return "5";
    case "토":
      return "6";
    case "일":
      return "7";
    case "주중":
      return "8";
    case "주말":
      return "9";
    default:
      return "0";
  }
};

const numberToDay = (num: string) => {
  switch (num) {
    case "1":
      return "월";
    case "2":
      return "화";
    case "3":
      return "수";
    case "4":
      return "목";
    case "5":
      return "금";
    case "6":
      return "토";
    case "7":
      return "일";
    case "8":
      return "주중";
    case "9":
      return "주말";
    default:
      return "";
  }
};

export { timeArrSort, dayToStrNumber, numberToDay };
