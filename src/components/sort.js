import AbstractComponent from "./abstract-component";

export const SortType = {
  SORT_BY_DATE: `sort-by-date`,
  SORT_BY_RATING: `sort-by-rating`,
  SORT_BY_DEFAULT: `sort-by-default`
};

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.SORT_BY_DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.SORT_BY_DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.SORT_BY_RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.SORT_BY_DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const activeButton = evt.target;
      const sortType = activeButton.dataset.sortType;
      if (this._currenSortType === sortType) {
        return;
      }
      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      activeButton.classList.add(`sort__button--active`);
      this._currenSortType = sortType;

      handler(this._currenSortType);

    });
  }
}
