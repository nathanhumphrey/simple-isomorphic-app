export const routes = [
  {
    path: '/',
    method: 'get',
    name: 'home',
    page: 'HomePage',
    exact: true,
    navigation: true,
    linkText: 'Home'
  },
  {
    path: '/signup',
    method: 'get',
    name: 'signup',
    page: 'SignUpPage',
    navigation: true,
    linkText: 'Sign Up'
  },
  {
    path: '/users/:id',
    method: 'get',
    name: 'userdetails',
    page: 'UserPage',
    navigation: true,
    linkText: 'Account'
  },
  {
    path: '*',
    method: 'get',
    name: 'nomatch',
    page: 'NoMatchPage'
  }
];
