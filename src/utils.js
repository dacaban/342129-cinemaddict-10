export const RenderPosition = {
  AFTEREND: `aftereend`,
  BEFOREEND: `beforeend`
};

export const getRandomIntegerNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case (RenderPosition.AFTEREND):
      container.prepend(element);
      break;
    case (RenderPosition.BEFOREEND):
      container.append(element);
      break;
  }
};
