export default class Movies {
  constructor() {
    this._films = [];
  }

  getMovies() {
    return this._films;
  }

  setMovies(films) {
    this._films = Array.from(films);
  }

  updateMovies(id, film) {
    const index = this._films.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    // TODO: вызвать обработчики
    return true;
  }
}
