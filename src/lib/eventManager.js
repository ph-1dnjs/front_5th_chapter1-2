const eventListenersMap = new WeakMap();

export function setupEventListeners(root) {
  for (const eventType in eventListenersMap) {
    root.removeEventListener(eventType, handleEvents);
    root.addEventListener(eventType, handleEvents);
  }
}

export function addEvent(element, eventType, handler) {
  if (!element || typeof handler !== "function") return;

  eventListenersMap[eventType] = eventListenersMap[eventType] || new WeakMap();
  eventListenersMap[eventType].set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  if (eventListenersMap[eventType].get(element) === handler) {
    eventListenersMap[eventType].delete(element);
  }
}

export function handleEvents(e) {
  if (eventListenersMap[e.type].has(e.target)) {
    eventListenersMap[e.type].get(e.target)(e);
  }
}
