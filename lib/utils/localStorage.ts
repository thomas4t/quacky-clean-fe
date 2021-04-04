const globalWindow =
  typeof window === "undefined" ? { localStorage: null } : window;

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = { [member: string]: JSONValue };
interface JSONArray extends Array<JSONValue> {}

export const localStorageApi = {
  getValue: (key: string): JSONValue | null => {
    if (!globalWindow.localStorage) {
      return null;
    }
    const stored = globalWindow.localStorage.getItem(key);
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return null;
  },
  setValue: (key: string, value: JSONValue) => {
    if (!globalWindow.localStorage) {
      return;
    }
    let strValue = "";
    try {
      strValue = JSON.stringify(value);
    } catch (e) {
      console.error(e);
    }
    globalWindow.localStorage.setItem(key, strValue);
  },
};
