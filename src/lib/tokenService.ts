let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

export const setRefreshing = (value: boolean) => {
  isRefreshing = value;
};

export const getRefreshing = () => isRefreshing;

export const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

export const onTokenRefreshed = (newAccessToken: string) => {
  refreshSubscribers.forEach((callback: any) => callback(newAccessToken));
  refreshSubscribers = [];
};
