export const getRandomIntegerNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};
