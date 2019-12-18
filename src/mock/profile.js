import {getRandomIntegerNumber} from '../utils/common';

export const generateUser = () => ({
  filmsCount: getRandomIntegerNumber(0, 100)
});
