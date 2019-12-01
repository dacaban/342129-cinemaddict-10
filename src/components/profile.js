const isInRange = (val, min, max = Infinity) => (val >= min && val <= max);

export const createProfileTemplate = (user) => {
  let userTitle = null;
  if (isInRange(user.filmsCount, 1, 10)) {
    userTitle = `Novice`;
  } else if (isInRange(user.filmsCount, 11, 20)) {
    userTitle = `Fan`;
  } else if (isInRange(user.filmsCount, 21)) {
    userTitle = `Movie Buff`;
  }
  return (userTitle ?
    `<section class="header__profile profile">
      <p class="profile__rating">${userTitle}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    : ``);
};

