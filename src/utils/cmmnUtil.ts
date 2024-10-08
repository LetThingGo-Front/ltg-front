const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

const removeStorageAll = () => {
  localStorage.clear();
};

const utils = {
  setStorage,
  getStorage,
  removeStorage,
  removeStorageAll,
};

export default utils;
