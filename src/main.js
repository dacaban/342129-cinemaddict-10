import BoardComponent from './components/board.js';
import PageController from "./controllers/page";
import SiteMenuComponent from './components/site-menu.js';
import ProfileComponent from './components/profile.js';
import SortComponent from './components/sort.js';
import {generateFilms} from './mock/film.js';
import {generateUser} from './mock/profile.js';
import {RenderPosition, render} from "./utils/render";

const FILMS_COUNT = 17;


const siteMainElement = document.querySelector(`.main`);
const HeaderElement = document.querySelector(`.header`);

const user = generateUser();
const films = generateFilms(FILMS_COUNT);
render(HeaderElement, new ProfileComponent(user), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(films), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new PageController(boardComponent);
boardController.render(films);
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const footerElement = document.querySelector(`.footer`);

const statistic = footerElement.querySelector(`.footer__statistics`).querySelector(`p`);
statistic.textContent = `${films.length} movies inside`;

