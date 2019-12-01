const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    `${year}/${month}/${day} ${hours}:${minutes}`
  );
};

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
          <span class="film-details__comment-day">${formatDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export const createCommentsTemplate = (comments) => (
  `<ul class="film-details__comments-list">
    ${comments
    .map((comment) => createCommentMarkup(comment))
    .join(``)}
  </ul>`
);
