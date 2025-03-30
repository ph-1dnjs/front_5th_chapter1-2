import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (
    typeof vNode === "boolean" ||
    typeof vNode === "undefined" ||
    vNode === null
  ) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    fragment.append(...vNode.map(createElement));
    return fragment;
  }

  const el = document.createElement(vNode.type);

  Object.entries(vNode.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => {
      if (attr === "className") {
        attr = "class";
      }
      el.setAttribute(attr, value);
    });

  vNode.children.map(createElement).forEach((child) => el.appendChild(child));

  return el;
}

function updateAttributes(el, props) {}
