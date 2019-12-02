import {createFilmTemplate} from './film.js';

const createFilmsListMarkup = (films) => films.map((film) =>
  (createFilmTemplate(film))).join(``);

export const createExtraFilmsTemplate = (title, films) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
      ${createFilmsListMarkup(films)}
    </div>
  </section>`
);
