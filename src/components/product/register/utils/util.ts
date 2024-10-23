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

export { timeArrSort };
