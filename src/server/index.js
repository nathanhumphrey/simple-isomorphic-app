import Koa from 'koa'; // base server
import koaWebpack from 'koa-webpack'; // useful for development
import webpack from 'webpack'; // to bundle in development
import config from '../../webpack.config'; // explicit import of webpack config
import renderReactApp from './render-react-app'; // performs the SSR
import Router from 'koa-router'; // server-side routing
import { routes } from '../app/routes'; // defined application routes

// create the app server
const app = new Koa();

// prepare webpack compiler
const compiler = webpack(config);

// create the app router
const router = new Router();

// define route(s)
routes.forEach(route => {
  router[route.method](route.path, renderReactApp);
});

// create koa webpack middleware
koaWebpack({ compiler }).then(middleware => {
  // use the koa middleware
  app.use(middleware);
  // removed the renderReactApp middleware, use router going forward
  app.use(router.routes()).use(router.allowedMethods());
});

// just listen on port 3000, for now
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
