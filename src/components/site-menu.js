export const createSiteMenuTemplate = (films) => {
  let watchlistCount = 0;
  let historyCount = 0;
  let favoritesCount = 0;
  films.forEach((film) => {
    if (film.isAdd) {
      watchlistCount++;
    }
    if (film.isWatched) {
      historyCount++;
    }
    if (film.isFavorite) {
      favoritesCount++;
    }
  });
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

