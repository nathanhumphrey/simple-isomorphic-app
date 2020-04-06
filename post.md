---
title: Full Stack JavaScript Application Build Part 4 Phase 1 - Database Access and Authentication
description: Part 4 of a series about how to build a full stack JavaScript application. This article is about database access and user authentication on the backend. The frontend implementation of user auth will be covered in phase 2 of Part 4.
abstract: 
date: 2020-04-06 7:00:00.00
tags:
  - software
  - tutorial
  - javascript
  - fullstack
  - koa
  - react
  - sequelize
  - passport
layout: layouts/post.njk
---

## Introduction

Welcome to Part 4: Phase 1 of the Full Stack Application series. Part 4 has been broken into two distinct phases, as the entire article had grown quite long. In this phase, we'll be adding database support and some basic user authentication to the application. Database support will be added via [Sequelize ORM](https://sequelize.org/), which will allow us to provision a testing database very easily, and provides a means to access different databases without much fuss. User authentication will be implemented via the [Passport.js](http://www.passportjs.org/) library, which again, will allow for an easy initial setup and the ability to update to other auth options very easily if needed. Phase 2 will see the implementation of this new auth system in the frontend of the application.

<p class="info">
    NOTE: Again, I feel it's warranted to state that the build is intended to provide you with a good base for developing full stack JavaScript applications, but you will need to do some additional learning in order to get this application really production ready.
</p>

**_The final project source can be found in this [GitHub repo](https://github.com/nathanhumphrey/simple-isomorphic-app/tree/database)_**

### Roadmap

The build is divided into a six-part series:

1. [Routes and pages](/posts/2020-02-06-full-stack-javascript-app-build-pt-1/)
2. [Building components](/posts/2020-02-12-full-stack-javascript-app-pt-2/)
3. [Styling components](/posts/2020-03-24-full-stack-javascript-app-pt-3/)
4. Database access and authentication
    1. [Backend implementation](/posts/2020-04-06-full-stack-javascript-app-pt-4-phase1/)
    2. [Frontend  implementation](/posts/2020-04-06-full-stack-javascript-app-pt-4-phase2/) ⇐ you are here
5. ~~Protecting against CSRF attacks~~ (coming soon)
6. ~~Production bundling~~ (coming soon)

### Update client components

#### Home page

#### User signup page

#### User profile page

## Conclusion

### Next steps
