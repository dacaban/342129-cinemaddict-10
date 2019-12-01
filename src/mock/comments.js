import {getRandomArrayItem} from '../utils.js';
import {getRandomIntegerNumber} from '../utils.js';

const EMOJI_NAMES = [
  `smile`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`
];
const COMMENT_TEXTS = [
  `Interesting setting and a good cast.`,
  `Booooooooooring...`,
  `Very very old. Meh.`,
  `Almost two hours? Seriously?`,
  `This is a movie that's both entertainment and spiritual toolkit-take from it what you need`,
  `...a better-than-average horror followup...`,
  `You'll watch knowing you're in the hands of a master filmmaker...`,
  `This is the best movie of the year... A tonal marvel.`,
  `I was just glued to the screen...amazing.`,
  `Whoever gave this film the green light...should be arrested`,
  `Who the hell says teens watch this?`,
  `This movie is a full crime.`,
  `Worst. Movie. Ever.`
];
const AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Emma Watson`,
  `Leonardo DiCaprio`,
  `James Carrey`,
  `Emmy Rossum`,
  `Filipp Kirkorov`,
  `Miron Fyodorov`,
  `Greta Thunberg`,
  `Sergey Andreev`,
  `Nursultan Nazarbayev`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 14);
  targetDate.setDate(targetDate.getDate() - diffValue);
  return targetDate;
};


const generateComment = () => ({
  emoji: `./images/emoji/${getRandomArrayItem(EMOJI_NAMES)}.png`,
  text: getRandomArrayItem(COMMENT_TEXTS),
  author: getRandomArrayItem(AUTHORS),
  date: getRandomDate(),
});

export const generateComments = (count) => (
  new Array(count)
    .fill(``)
    .map(generateComment)
);

