import { createObserver } from "./createObserver";
import { BASE_URL } from "../config.js";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => window.location.pathname.replace(BASE_URL, "/");

  const getTarget = () => {
    return routes[getPath()];
  };

  const push = (path) => {
    window.history.pushState(null, null, `${BASE_URL.slice(0, -1)}${path}`);
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget,
  };
};
