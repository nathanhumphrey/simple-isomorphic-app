import { User } from '../db/models';
import passport from 'koa-passport';

/**
 * Custom middleware that requires authentication for a route.
 * If the user is not authenticated, return 401 - Unauthorized.
 */
const requireAuth = async (ctx, next) => {
  if (ctx.isUnauthenticated()) {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  } else {
    await next();
  }
};

export const routes = [
  {
    path: '/signup',
    method: 'post',
    middleware: [
      async ctx => {
        // TODO: validate incoming fields
        // TODO: then, check that the user doesn't already exist
        try {
          // create a new user with the password hash from bcrypt
          const user = await User.create(
            Object.assign(ctx.request.body, {
              passwordHash: await User.generatePasswordHash(
                ctx.request.body.password
              )
            })
          );

          // only send back relevant details
          const { firstName, lastName, email } = user;
          ctx.status = 201; // created
          ctx.type = 'application/json';
          ctx.body = JSON.stringify({ user: { firstName, lastName, email } });
        } catch (err) {
          ctx.status = 400;
          ctx.body = `Could not create new user: ${err}`;
        }
      }
    ]
  },
  {
    path: '/signin',
    method: 'post',
    middleware: [
      passport.authenticate('local'),
      async ctx => {
        // only send back relevant details
        const { id, firstName, lastName, email } = ctx.state.user;
        ctx.status = 200; // ok
        ctx.type = 'application/json';
        ctx.body = JSON.stringify({ user: { id, firstName, lastName, email } });
      }
    ]
  },
  {
    path: '/users/:id',
    method: 'get',
    middleware: [
      requireAuth,
      async ctx => {
        // match the request to the currently authenticated user
        if (ctx.params.id === ctx.state.user.id) {
          // find the user in the database
          const {
            id,
            firstName,
            lastName,
            email,
            createdAt,
            updatedAt
          } = await User.findOne({ where: { id: ctx.params.id } });

          ctx.status = 200; // ok
          ctx.type = 'application/json';
          ctx.body = JSON.stringify({
            user: { id, firstName, lastName, email, createdAt, updatedAt }
          });
        } else {
          ctx.status = 404;
          ctx.body = 'Not found';
        }
      }
    ]
  },
  {
    path: '/signout',
    method: 'get',
    middleware: [
      async ctx => {
        ctx.logout();
        ctx.status = 204; // success, no content
      }
    ]
  }
];
