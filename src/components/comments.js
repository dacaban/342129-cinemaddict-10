import AbstractComponent from "./abstract-component";
import {formatCommentDate} from "../utils/common";

const createCommentMarkup = (comment) => {
  const {emoji, text, author, date} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsTemplate = (comments) => (
  `<ul class="film-details__comments-list">
    ${comments
    .map((comment) => createCommentMarkup(comment))
    .join(``)}
  </ul>`
);

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }
  getTemplate() {
    return createCommentsTemplate(this._comments);
  }
}
