import {createBoardTemplate} from './components/board.js';
import {createFilmTemplate} from './components/film.js';
import {createPopupTemplate} from './components/popup.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createProfileTemplate} from './components/profile.js';
import {createSortTemplate} from './components/sort.js';

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const HeaderElement = document.querySelector(`.header`);

render(HeaderElement, createProfileTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createBoardTemplate());

const filmsBoardElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsBoardElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
new Array(FILMS_COUNT)
  .fill(``)
  .forEach(
      () => render(filmsListContainerElement, createFilmTemplate())
  );

render(filmsListElement, createLoadMoreButtonTemplate());

const extraFilmsListElements = filmsBoardElement.querySelectorAll(`.films-list--extra`);
extraFilmsListElements.forEach(
    (it) => {
      const extraFilmsListContainerElements = it.querySelector(`.films-list__container`);
      new Array(EXTRA_FILMS_COUNT)
        .fill(``)
        .forEach(() => render(extraFilmsListContainerElements, createFilmTemplate())
        );
    }
);

const footerElement = document.querySelector(`.footer`);
render(footerElement, createPopupTemplate(), `afterEnd`);
