export const RenderPosition = {
  AFTEREND: `aftereend`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case (RenderPosition.AFTEREND):
      container.prepend(component.getElement());
      break;
    case (RenderPosition.BEFOREEND):
      container.append(component.getElement());
      break;
    default:
      container.append(component.getElement());
  }
};

export const hideElement = (component) => component.getElement().remove();

export const removeElement = (component) => {
  hideElement(component);
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const oldElement = oldComponent.getElement();
  const newElement = newComponent.getElement();
  const parentElement = oldElement.parentElement;
  const isExistElements = !!(oldElement && newElement && parentElement);
  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
