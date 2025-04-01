import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps, originOldProps) {
  const newPropsArr = originNewProps ? Object.entries(originNewProps) : [];
  const oldPropsArr = originOldProps ? Object.entries(originOldProps) : [];

  for (const [prop, value] of oldPropsArr) {
    let newPropValue = originNewProps[prop];

    if (isEventProp(prop)) {
      removeEvent(target, replaceEventProp(prop), value);
      newPropValue = originNewProps[replaceEventProp(prop)];
    }

    if (newPropValue === undefined) {
      target.removeAttribute(prop);
      continue;
    }

    if (value !== newPropValue) {
      if (isClass(prop)) {
        target.classList = newPropValue;
        continue;
      }
      if (isEventProp(prop)) {
        addEvent(target, replaceEventProp(prop), newPropValue);
        continue;
      }

      target.setAttribute(prop, newPropValue);
      continue;
    }

    if (value === originNewProps[prop]) {
      continue;
    }
  }

  for (const [prop, value] of newPropsArr) {
    if (oldPropsArr[prop] === undefined) {
      if (isEventProp(prop)) {
        addEvent(target, replaceEventProp(prop), value);
        return;
      }
      if (isClass(prop)) {
        target.classList = value;
        continue;
      }
      target.setAttribute(prop, value);
    }
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (newNode && !oldNode) {
    parentElement.appendChild(createElement(newNode));
    return;
  }

  if (oldNode && !newNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    return;
  }

  if (typeof newNode === "string" || typeof newNode === "number") {
    if (oldNode !== newNode) {
      parentElement.childNodes[index].textContent = newNode;
    }
    return;
  }

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
    return;
  }

  updateAttributes(
    parentElement.childNodes[index],
    newNode.props || {},
    oldNode.props || {},
  );

  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  if (maxLength === 0) {
    return;
  }

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i,
    );
  }
}

function isEventProp(prop) {
  return /^on[A-Z]/.test(prop);
}

function isClass(prop) {
  return prop === "class" || prop === "className";
}

function replaceEventProp(prop) {
  return prop.slice(2).toLowerCase();
}
