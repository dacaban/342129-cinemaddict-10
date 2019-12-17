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

export const hide = (component) => component.getElement().remove();

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
