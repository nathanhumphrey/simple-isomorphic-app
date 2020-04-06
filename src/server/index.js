import path from 'path'; // for defining static asset path
import Koa from 'koa'; // base server
import koaWebpack from 'koa-webpack'; // useful for development
import webpack from 'webpack'; // to bundle in development
import koaStatic from 'koa-static'; // serves static assets
import config from '../../webpack.config'; // explicit import of webpack config
import renderReactApp from './render-react-app'; // performs the SSR
import Router from 'koa-router'; // server-side routing
import { routes } from '../app/routes'; // defined application routes
import { routes as apiRoutes } from './routes'; // defined application routes
import db from '../db/models/index'; // Requiring our models for syncing

import session from 'koa-session';
import passport from 'koa-passport';
import bodyParser from 'koa-bodyparser';
import './user-auth.js';

// create the app server
const app = new Koa();

// sessions
app.keys = ['s3cur3s3cr3t'];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// prepare webpack compiler
const compiler = webpack(config);

// create the app router
const router = new Router();

// create the api router
const apiRouter = new Router({
  prefix: '/api'
});

// define route(s)
routes.forEach(route => {
  router[route.method](route.path, renderReactApp);
});

// define api route(s)
apiRoutes.forEach(route => {
  apiRouter[route.method](route.path, ...route.middleware);
});

// create koa webpack middleware
koaWebpack({ compiler }).then(middleware => {
  // use the koa middleware
  app.use(middleware);
  // removed the renderReactApp middleware, use router going forward
  app
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(koaStatic(path.join(__dirname, '../../static')));
});

// sync our sequelize models and then start server
// force: true will wipe our database on each server restart
// this is ideal while/if we change the models around
db.sequelize.sync({ force: true }).then(() => {
  // inside our db sync callback, we start the server
  // this is our way of making sure the server is not listening
  // to requests if we have not made a db connection
  // just listen on port 3000, for now
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
