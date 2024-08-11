const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

const utils = {
  setStorage,
  getStorage,
  removeStorage,
};

export default utils;
