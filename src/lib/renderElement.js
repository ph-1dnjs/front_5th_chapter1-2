import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

const OldNodeMap = new WeakMap();

export function renderElement(vNode, container) {
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.
  if (!vNode) {
    return;
  }

  const oldNode = OldNodeMap.get(container);
  const newNode = normalizeVNode(vNode);

  if (!oldNode) {
    container.appendChild(createElement(newNode));
  } else {
    if (container.firstChild) {
      updateElement(container, newNode, oldNode);
    } else {
      container.appendChild(createElement(newNode));
    }
  }

  OldNodeMap.set(container, newNode);
  setupEventListeners(container);
}
