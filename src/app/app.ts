import { Router } from './router';
import { ROUTES } from '../shared/config/routes';
import { homePage, aboutPage, projectsPage, blogPage, experiencePage, contactPage } from '../pages/index.ts';

const router = new Router('app-root');

router
  .addRoute(ROUTES.HOME, homePage)
  .addRoute(ROUTES.ABOUT, aboutPage)
  .addRoute(ROUTES.PROJECTS, projectsPage)
  .addRoute(ROUTES.BLOG, blogPage)
  .addRoute(ROUTES.EXPERIENCE, experiencePage)
  .addRoute(ROUTES.CONTACT, contactPage)
  .resolve();