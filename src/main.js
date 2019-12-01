import {createBoardTemplate} from './components/board.js';
import {createFilmTemplate} from './components/film.js';
import {createExtraFilmsTemplate} from './components/extra-films.js';
import {createPopupTemplate} from './components/popup.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createProfileTemplate} from './components/profile.js';
import {createSortTemplate} from './components/sort.js';
import {generateFilms} from './mock/film.js';
import {generateUser} from './mock/profile.js';

const FILMS_COUNT = 17;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const HeaderElement = document.querySelector(`.header`);

const user = generateUser();
const films = generateFilms(FILMS_COUNT);
render(HeaderElement, createProfileTemplate(user));
render(siteMainElement, createSiteMenuTemplate(films));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createBoardTemplate());

const filmsBoardElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsBoardElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingTasksCount = SHOWING_FILMS_COUNT_ON_START;
films
  .slice(0, showingTasksCount)
  .forEach(
      (film) => render(filmsListContainerElement, createFilmTemplate(film))
  );

render(filmsListElement, createLoadMoreButtonTemplate());

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films
    .slice(prevTasksCount, showingTasksCount)
    .forEach((film) => render(filmsListContainerElement, createFilmTemplate(film)));

  if (showingTasksCount >= films.length) {
    loadMoreButton.remove();
  }
});

const topRatingFilms = films
  .sort((film1, film2) => (film2.rating - film1.rating))
  .filter((film) => film.rating !== 0)
  .slice(0, EXTRA_FILMS_COUNT);
if (topRatingFilms.length > 0) {
  render(filmsBoardElement, createExtraFilmsTemplate(`Top rated`, topRatingFilms));
}

const topCommentsFilms = films
  .sort((film1, film2) => (film2.comments.length - film1.comments.length))
  .filter((film) => film.comments.length !== 0)
  .slice(0, EXTRA_FILMS_COUNT);

if (topRatingFilms.length > 0) {
  render(filmsBoardElement, createExtraFilmsTemplate(`Most commented`, topCommentsFilms));
}

const footerElement = document.querySelector(`.footer`);
render(footerElement, createPopupTemplate(films[0]), `afterEnd`);

const statistic = footerElement.querySelector(`.footer__statistics`).querySelector(`p`);
statistic.textContent = `${films.length} movies inside`;

