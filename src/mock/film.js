import {getRandomIntegerNumber, getRandomArrayItem} from '../utils/common';
import {generateComments} from './comments';

const FILM_NAMES = [
  `Ford V Ferrary`,
  `A beautiful day in the neighborhood`,
  `Doctor Sleep`,
  `21 Bridges`,
  `Parasite`,
  `Honey boy`,
  `The lighthouse`,
  `Waves`,
  `Pain and Glory`,
  `Downton Abbey`,
  `Ad astra`,
  `The peanut butter falcon`,
  `Varda by Agnes`,
  `Synonyms`,
  `Judy`
];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const GENRES = [
  `Action`,
  `Adventure`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Epic`,
  `Horror`,
  `Western`
];
const POSTER_NAMES = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const RESTRICTIONS = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`
];
const DIRECTORS = [
  `James Mangold`,
  `Marielle Heller`,
  `Taika Waititi`,
  `Brian Kirk`,
  `Trey Edward Shults`,
  `James Gray`,
  `Robert Eggers`
];
const WRITERS = [
  `Jez Butterworth`,
  `Micah Fitzerman-Blue`,
  `Noah Harpster`,
  `Mike Flanagan`,
  `Stephen King`,
  `Christine Leunens`,
  `Taika Waititi`,
  `Adam Mervis`,
  `Matthew Michael Carnahan`,
  `Trey Edward Shults`,
  `James Gray`,
  `Ethan Gross`
];
const ACTORS = [
  `Matt Damon`,
  `Christian Bale`,
  `Jon Bernthal`,
  `Tom Hanks`,
  `Matthew Rhys`,
  `Chris Cooper`,
  `Ewan McGregor`,
  `Rebecca Ferguson`,
  `Kyliegh Curran`,
  `Chadwick Boseman`,
  `Sienna Miller`,
  `J.K. Simmons`,
  `Taylor Russell`,
  `Kelvin Harrison Jr.`,
  `Alexa Demie`,
  `Brad Pitt`,
  `Tommy Lee Jones`,
  `Ruth Negga`,
  `Willem Dafoe`,
  `Valeriia Karaman`
];

const COUNTRIES = [
  `USA`,
  `UK`,
  `Russia`,
  `Germany`,
  `Franch`,
  `Ukraine`
];

const generateRating = () => ((Math.random() * (10)).toFixed(1));

const generateDuration = () => {
  const hours = getRandomIntegerNumber(0, 3);
  const minutes = getRandomIntegerNumber(1, 60);
  return (hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`);
};

const generateList = (count, values, separator = ` `) => (
  new Array(count)
    .fill(``)
    .map(() => getRandomArrayItem(values))
    .join(separator)
);

const generateGenres = () => {
  const count = getRandomIntegerNumber(1, 4);
  return new Array(count)
    .fill(``)
    .map(() => getRandomArrayItem(GENRES));
};

const generateDate = () => {
  const year = getRandomIntegerNumber(1980, 2019);
  const month = getRandomIntegerNumber(0, 11);
  const day = getRandomIntegerNumber(1, 30);
  return new Date(year, month, day);
};


const descriptionsCount = getRandomIntegerNumber(1, 4);
const writersCount = getRandomIntegerNumber(1, 4);
const actorsCount = getRandomIntegerNumber(1, 5);

const generateFilm = () => ({
  id: String(new Date() + Math.random()),
  name: getRandomArrayItem(FILM_NAMES),
  rating: generateRating(),
  userRating: null,
  release: generateDate(),
  duration: generateDuration(),
  genres: generateGenres(),
  poster: `./images/posters/${getRandomArrayItem(POSTER_NAMES)}`,
  description: generateList(descriptionsCount, DESCRIPTIONS),
  comments: generateComments(getRandomIntegerNumber(0, 20)),
  isAdded: Math.random() > 0.5,
  isWatched: Math.random() > 0.5,
  isFavored: Math.random() > 0.5,
  age: getRandomArrayItem(RESTRICTIONS),
  director: getRandomArrayItem(DIRECTORS),
  writers: generateList(writersCount, WRITERS, `, `),
  actors: generateList(actorsCount, ACTORS, `, `),
  country: getRandomArrayItem(COUNTRIES)
});

export const generateFilms = (count) => (
  new Array(count)
    .fill(``)
    .map(generateFilm)
);
