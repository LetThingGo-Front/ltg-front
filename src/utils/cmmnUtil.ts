const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key: string) => {
  if (typeof window === "undefined") {
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

const isEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

const objectToQueryString = (params: Record<string, any>) => {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

const unescapeHtml = (str: string) => {
  const map: { [key: string]: string } = {
    "&apos;": "'",
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ", // HTML 엔티티에서 공백으로 변환
  };

  return str.replace(
    /&apos;|&quot;|&amp;|&lt;|&gt;|&nbsp;/g,
    (match) => map[match] || match,
  );
};

const parseHtmlString = (html: any) => {
  const regex = /(<([^>]+)>(.*?)<\/\2>)|([^<]+)/g;

  return html.match(regex).map((part: any) => {
    if (part.startsWith("<")) {
      const match = part.match(/<([^>]+)>(.*?)<\/\1>/);
      const content = match[2]; // 태그 내부 텍스트
      return content;
    }

    // 텍스트에서 특수 문자를 변환
    return part;
  });
};

const utils = {
  setStorage,
  getStorage,
  removeStorage,
  removeStorageAll,
  isEmpty,
  objectToQueryString,
  parseHtmlString,
  unescapeHtml,
};

export default utils;
