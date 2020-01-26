import MovieController from "./movie";
import {removeElement, render, RenderPosition} from "../utils/render";
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

const renderFilms = (filmsList, films, onDataChange, onViewChange) => {
  return films
    .map(
        (film) => {
          const movieController = new MovieController(filmsList, onDataChange, onViewChange);
          movieController.render(film);
          return movieController;
        }
    );
};

const renderExtraFilms = (container, films, title, onDataChange, onViewChange) => {
  if (films.length > 0) {
    const extraFilmComponent = new ExtraFilmsComponent(title);
    const extraFilmContainer = extraFilmComponent.getElement().querySelector(`.films-list__container`);
    render(container, extraFilmComponent, RenderPosition.BEFOREEND);
    return films
      .map(
          (film) => {
            const movieController = new MovieController(extraFilmContainer, onDataChange, onViewChange);
            movieController.render(film);
            return movieController;
          }
      );
  }
  return [];
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._filmsByDefault = [];
    this._showedFilmControllers = [];
    this._extraFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

  }
  render(films) {
    this._films = films;
    this._filmsByDefault = films;

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

    const newFilms = renderFilms(filmsListContainerElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderLoadMoreButton();

    render(boardComponent, this._filmsComponent, RenderPosition.BEFOREEND);

    const topRatingFilms = films
      .sort((film1, film2) => (film2.rating - film1.rating))
      .filter((film) => film.rating !== 0)
      .slice(0, EXTRA_FILMS_COUNT);
    let extraFilms = renderExtraFilms(boardComponent, topRatingFilms, `Top rated`, this._onDataChange, this._onViewChange);
    this._extraFilmControllers = this._extraFilmControllers.concat(extraFilms);

    const topCommentsFilms = films
      .sort((film1, film2) => (film2.comments.length - film1.comments.length))
      .filter((film) => film.comments.length !== 0)
      .slice(0, EXTRA_FILMS_COUNT);
    extraFilms = renderExtraFilms(boardComponent, topCommentsFilms, `Most commented`, this._onDataChange, this._onViewChange);
    this._extraFilmControllers = this._extraFilmControllers.concat(extraFilms);

    render(container, this._boardComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }
    const container = this._filmsComponent.getElement();
    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      const filmListElement = container.querySelector(`.films-list__container`);

      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const newFilms = renderFilms(filmListElement, this._films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        removeElement(this._loadMoreButtonComponent);
      }
    });
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
    this._extraFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    switch (sortType) {
      case SortType.SORT_BY_DATE:
        sortedFilms = this._filmsByDefault.slice().sort(((a, b) => b.release - a.release));
        break;
      case SortType.SORT_BY_RATING:
        sortedFilms = this._filmsByDefault.slice().sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedFilms = this._filmsByDefault.slice();
    }
    const filmsListContainerElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = ``;
    this._showedFilmControllers = renderFilms(filmsListContainerElement, sortedFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._films = sortedFilms.slice();
  }
}
