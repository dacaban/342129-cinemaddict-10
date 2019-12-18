import FilmComponent from "../components/film";
import PopupComponent from "../components/popup";
import {hideElement, removeElement, render, RenderPosition} from "../utils/render";
import ExtraFilmsComponent from "../components/extra-films";
import NoFilmsComponent from "../components/no-films";
import FilmsComponent from "../components/films";
import LoadMoreButtonComponent from "../components/load-more-button";

const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const footerElement = document.querySelector(`.footer`);

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
  }
  render(films) {
    const container = this._container.getElement();
    if (films.length === 0) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    } else {
      const filmsComponent = this._filmsComponent;
      const filmsListContainerElement = filmsComponent.getElement().querySelector(`.films-list__container`);
      let showingTasksCount = SHOWING_FILMS_COUNT_ON_START;
      renderFilms(filmsListContainerElement, films.slice(0, showingTasksCount));

      if (films.length > SHOWING_FILMS_COUNT_ON_START) {
        const loadMoreButtonComponent = new LoadMoreButtonComponent();

        loadMoreButtonComponent.setClickHandler(() => {
          const prevTasksCount = showingTasksCount;
          showingTasksCount = showingTasksCount + SHOWING_FILMS_COUNT_BY_BUTTON;

          renderFilms(filmsListContainerElement, films.slice(prevTasksCount, showingTasksCount));

          if (showingTasksCount >= films.length) {
            removeElement(loadMoreButtonComponent);
          }
        });

        render(filmsComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);
      }

      render(container, filmsComponent, RenderPosition.BEFOREEND);

      const topRatingFilms = films
        .sort((film1, film2) => (film2.rating - film1.rating))
        .filter((film) => film.rating !== 0)
        .slice(0, EXTRA_FILMS_COUNT);
      renderExtraFilms(container, topRatingFilms, `Top rated`);

      const topCommentsFilms = films
        .sort((film1, film2) => (film2.comments.length - film1.comments.length))
        .filter((film) => film.comments.length !== 0)
        .slice(0, EXTRA_FILMS_COUNT);
      renderExtraFilms(container, topCommentsFilms, `Most commented`);
    }
  }
}
