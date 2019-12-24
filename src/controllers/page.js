import FilmComponent from "../components/film";
import PopupComponent from "../components/popup";
import {hideElement, removeElement, render, RenderPosition} from "../utils/render";
import ExtraFilmsComponent from "../components/extra-films";
import NoFilmsComponent from "../components/no-films";
import FilmsComponent from "../components/films";
import LoadMoreButtonComponent from "../components/load-more-button";
import SortComponent from '../components/sort.js';
import BoardComponent from '../components/board.js';
import {SortType} from "../components/sort";

const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const footerElement = document.querySelector(`.footer`);

const getDate = (date) => {
  return new Date(date.year, date.month, date.day);
};

const renderFilm = (filmsList, film) => {
  const filmComponent = new FilmComponent(film);
  const popupComponent = new PopupComponent(film);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      closePopup();
    }
  };
  const openPopup = () => {
    render(footerElement, popupComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };
  const closePopup = () => {
    hideElement(popupComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };
  filmComponent.setPosterClickHandler(openPopup);
  filmComponent.setTitleClickHandler(openPopup);
  filmComponent.setCommentsClickHandler(openPopup);

  popupComponent.setCloseButtonClickHandler(closePopup);
  render(filmsList, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmsList, films) => {
  films.forEach(
      (film) => renderFilm(filmsList, film)
  );
};

const renderExtraFilms = (container, films, title) => {
  if (films.length > 0) {
    const extraFilmComponent = new ExtraFilmsComponent(title);
    const extraFilmContainer = extraFilmComponent.getElement().querySelector(`.films-list__container`);
    films.map((film) => renderFilm(extraFilmContainer, film));
    render(container, extraFilmComponent, RenderPosition.BEFOREEND);
  }
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
    this._loadMoreButton = new LoadMoreButtonComponent();
  }
  render(films) {
    const renderLoadMoreButton = () => {
      if (sortedFilms.length <= SHOWING_FILMS_COUNT_ON_START) {
        return;
      }
      const loadMoreButtonComponent = this._loadMoreButton;

      loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilms(filmsListContainerElement, sortedFilms.slice(prevTasksCount, showingTasksCount));

        if (showingTasksCount >= sortedFilms.length) {
          removeElement(loadMoreButtonComponent);
        }
      });

      render(filmsComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);
    };


    const container = this._container;
    const boardComponent = this._boardComponent.getElement();

    if (films.length === 0) {
      render(boardComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const sortComponent = this._sortComponent;
    render(container, sortComponent, RenderPosition.BEFOREEND);

    const filmsComponent = this._filmsComponent.getElement();
    const filmsListContainerElement = filmsComponent.querySelector(`.films-list__container`);
    let showingTasksCount = SHOWING_FILMS_COUNT_ON_START;

    let sortedFilms = films.slice();
    renderFilms(filmsListContainerElement, sortedFilms.slice(0, showingTasksCount));
    renderLoadMoreButton();

    sortComponent.setSortTypeChangeHandler((sortType) => {
      switch (sortType) {
        case SortType.SORT_BY_DATE:
          sortedFilms = films.slice().sort(((a, b) => getDate(b.release) - getDate(a.release)));
          break;
        case SortType.SORT_BY_RATING:
          sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
          break;
        default:
          sortedFilms = films.slice();
      }
      filmsListContainerElement.innerHTML = ``;
      renderFilms(filmsListContainerElement, sortedFilms.slice(0, showingTasksCount));
    });

    render(boardComponent, this._filmsComponent, RenderPosition.BEFOREEND);

    const topRatingFilms = films
      .sort((film1, film2) => (film2.rating - film1.rating))
      .filter((film) => film.rating !== 0)
      .slice(0, EXTRA_FILMS_COUNT);
    renderExtraFilms(boardComponent, topRatingFilms, `Top rated`);

    const topCommentsFilms = films
      .sort((film1, film2) => (film2.comments.length - film1.comments.length))
      .filter((film) => film.comments.length !== 0)
      .slice(0, EXTRA_FILMS_COUNT);
    renderExtraFilms(boardComponent, topCommentsFilms, `Most commented`);

    render(container, this._boardComponent, RenderPosition.BEFOREEND);
  }
}
