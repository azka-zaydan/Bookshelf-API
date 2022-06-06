const {defaultHomePage,
  postNewBook,
  showAllBook,
  getBookById,
  editBookById} = require('./handler');
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: defaultHomePage,
  },
  {
    method: 'POST',
    path: '/',
    handler: defaultHomePage,
  },
  {
    method: 'POST',
    path: '/books',
    handler: postNewBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: showAllBook,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById,
  },
];

module.exports = routes;
