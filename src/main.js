import PageController from "./controllers/page";
import SiteMenuComponent from './components/site-menu.js';
import ProfileComponent from './components/profile.js';
import Movies from './models/movies';
import {generateFilms} from './mock/film.js';
import {generateUser} from './mock/profile.js';
import {RenderPosition, render} from "./utils/render";

const FILMS_COUNT = 17;


const siteMainElement = document.querySelector(`.main`);
const HeaderElement = document.querySelector(`.header`);

const user = generateUser();
const films = generateFilms(FILMS_COUNT);
const moviesModel = new Movies();
moviesModel.setMovies(films);

render(HeaderElement, new ProfileComponent(user), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(films), RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, moviesModel);
pageController.render();


const footerElement = document.querySelector(`.footer`);

const statistic = footerElement.querySelector(`.footer__statistics`).querySelector(`p`);
statistic.textContent = `${films.length} movies inside`;
