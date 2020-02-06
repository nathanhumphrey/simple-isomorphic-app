export const routes = [
  {
    path: '/',
    method: 'get',
    name: 'home',
    page: 'HomePage',
    exact: true
  },
  {
    path: '/signup',
    method: 'get',
    name: 'signup',
    page: 'SignUpPage'
  },
  {
    path: '/users/:id',
    method: 'get',
    name: 'userdetails',
    page: 'UserPage'
  },
  {
    path: '*',
    method: 'get',
    name: 'nomatch',
    page: 'NoMatchPage'
  }
];
