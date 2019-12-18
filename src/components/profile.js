import AbstractComponent from "./abstract-component";

const isInRange = (val, min, max = Infinity) => val >= min && val <= max;

const getUserTitle = (user) => {
  let userTitle = ``;
  if (isInRange(user.filmsCount, 1, 10)) {
    userTitle = `Novice`;
  } else if (isInRange(user.filmsCount, 11, 20)) {
    userTitle = `Fan`;
  } else if (isInRange(user.filmsCount, 21)) {
    userTitle = `Movie Buff`;
  }
  return userTitle;
};

const createProfileTemplate = (user) => {
  const userTitle = getUserTitle(user);
  return (userTitle ?
    `<section class="header__profile profile">
      <p class="profile__rating">${userTitle}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    : ``);
};

export default class Profile extends AbstractComponent {
  constructor(user) {
    super();
    this._user = user;
  }
  getTemplate() {
    return createProfileTemplate(this._user);
  }
}
