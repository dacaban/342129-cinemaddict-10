import BoardComponent from './components/board.js';
import FilmComponent from './components/film.js';
import ExtraFilmsComponent from './components/extra-films.js';
import PopupComponent from './components/popup.js';
import SiteMenuComponent from './components/site-menu.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import ProfileComponent from './components/profile.js';
import SortComponent from './components/sort.js';
import {generateFilms} from './mock/film.js';
import {generateUser} from './mock/profile.js';
import {RenderPosition, render} from "./utils";

const FILMS_COUNT = 17;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (film, container) => {
  const filmComponent = new FilmComponent(film);
  const popupComponent = new PopupComponent(film);
  const posterElement = filmComponent.getElement().querySelector(`.film-card__poster`);
  const titleElement = filmComponent.getElement().querySelector(`.film-card__title`);
  const commentsElement = filmComponent.getElement().querySelector(`.film-card__comments`);
  const openPopup = () => render(footerElement, popupComponent.getElement(), RenderPosition.AFTEREND);
  posterElement.addEventListener(`click`, openPopup);
  titleElement.addEventListener(`click`, openPopup);
  commentsElement.addEventListener(`click`, openPopup);

  const closeButtonElement = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButtonElement.addEventListener(`click`, () => {
    popupComponent.getElement().remove();
  });
  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderExtraFilms = (films, title) => {
  if (films.length > 0) {
    const extraFilmComponent = new ExtraFilmsComponent(title);
    const extraFilmContainer = extraFilmComponent.getElement().querySelector(`.films-list__container`);
    films.map((film) => renderFilm(film, extraFilmContainer));
    render(boardComponent.getElement(), extraFilmComponent.getElement(), RenderPosition.BEFOREEND);
  }
};

const siteMainElement = document.querySelector(`.main`);
const HeaderElement = document.querySelector(`.header`);

const user = generateUser();
const films = generateFilms(FILMS_COUNT);
render(HeaderElement, new ProfileComponent(user).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListElement = boardComponent.getElement().querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingTasksCount = SHOWING_FILMS_COUNT_ON_START;
films
  .slice(0, showingTasksCount)
  .forEach(
      (film) => renderFilm(film, filmsListContainerElement)
  );

if (films.length > SHOWING_FILMS_COUNT_ON_START) {
  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(filmsListElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films
      .slice(prevTasksCount, showingTasksCount)
      .forEach((film) => renderFilm(film, filmsListContainerElement));

    if (showingTasksCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

const topRatingFilms = films
  .sort((film1, film2) => (film2.rating - film1.rating))
  .filter((film) => film.rating !== 0)
  .slice(0, EXTRA_FILMS_COUNT);
renderExtraFilms(topRatingFilms, `Top rated`);

const topCommentsFilms = films
  .sort((film1, film2) => (film2.comments.length - film1.comments.length))
  .filter((film) => film.comments.length !== 0)
  .slice(0, EXTRA_FILMS_COUNT);
renderExtraFilms(topCommentsFilms, `Most commented`);

const footerElement = document.querySelector(`.footer`);

const statistic = footerElement.querySelector(`.footer__statistics`).querySelector(`p`);
statistic.textContent = `${films.length} movies inside`;

