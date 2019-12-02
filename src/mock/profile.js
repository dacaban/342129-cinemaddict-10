import {getRandomIntegerNumber} from '../utils.js';

export const generateUser = () => ({
  filmsCount: getRandomIntegerNumber(0, 100)
});
