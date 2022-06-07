const {
  postNewBook,
  showAllBook,
  getBookById,
  editBookById,
  deleteBookById} = require('./handler');
const routes = [
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
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

module.exports = routes;
