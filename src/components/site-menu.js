import AbstractComponent from "./abstract-component";

const getFilmsCountByProperty = (films, property) => films.filter((film) =>film[property]).length;

const createSiteMenuTemplate = (films) => {
  const addedFilmsCount = getFilmsCountByProperty(films, `isAdded`);
  const watchedFilmsCount = getFilmsCountByProperty(films, `isWatched`);
  const favoritedFilmsCount = getFilmsCountByProperty(films, `isFavored`);
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${addedFilmsCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedFilmsCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritedFilmsCount}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }
  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }
}
