import AbstractComponent from "./abstract-component";

const createBoardTemplate = () => (
  `<section class="films">
  </section>`
);

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
