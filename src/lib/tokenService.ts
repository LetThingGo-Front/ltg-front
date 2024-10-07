// lib/tokenService.js

let _isRefreshing = false; // 재발급 진행 중 여부
let refreshSubscribers: any = []; // 재발급 완료 후 대기 중인 요청 목록

const getIsRefreshing = () => _isRefreshing;

const setIsRefreshing = (value: boolean) => {
  _isRefreshing = value;
};

// 새로운 토큰이 발급되면 대기 중인 요청에 적용
const onRefreshed = (newAccessToken: any) => {
  refreshSubscribers.forEach((callback: any) => callback(newAccessToken));
  refreshSubscribers = [];
};

// 재발급 중인 요청 대기 목록에 추가
const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback);
};

export { getIsRefreshing, setIsRefreshing, addRefreshSubscriber, onRefreshed };
