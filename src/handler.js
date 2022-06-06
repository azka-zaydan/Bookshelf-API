const {nanoid} = require('nanoid');
const books = require('./books');

const defaultHomePage = () => '<h1>Hi this is Home</h1>';

const postNewBook = (request, h) => {
  const {name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;
  const id = nanoid(10);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount == readPage ? true : false;
  if (typeof name == 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.statusCode = 400;
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.statusCode = 400;
    return response;
  }
  try {
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };
    books.push(newBook);
    const response = h.response({
      'status': 'success',
      'message': 'Buku berhasil ditambahkan',
      'data': {
        'bookId': newBook.id,
      },
    });
    response.statusCode = 201;
    return response;
  } catch (error) {
    const response = h.response({
      status: 'error',
      message: 'buku gagal ditambahkan',
    });
    response.statusCode = 500;
    return response;
  };
};
;

const showAllBook = (request, h) => {
  const {name, reading, finished} = request.query;
  const allBooks = books.map((book)=>{
    return {
      'id': book.id,
      'name': book.name,
      'publisher': book.publisher,
    };
  });
  if (name || reading || finished !== undefined) {
    const book = books.filter((book) => {
      if (book.name == name || book.reading == reading || book.finished == finished) {
        return {
          'id': book.id,
          'name': book.name,
          'publisher': book.publisher,
        };
      }
    });
    const response = h.response({
      status: 'success',
      data: book,
    });
    response.statusCode = 200;
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: allBooks,
    },
  });
  response.statusCode = 200;
  return response;
};

const getBookById = (request, h) => {
  const {id} = request.params;
  const book = books.filter((book) => book.id === id);
  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'buku tidak ditemukan',
    });
    response.statusCode = 404;
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: book,
    });
    response.statusCode;
    return response;
  };
};

const editBookById = (request, h) => {
  const {name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;
  const {id} = request.params;
  const updatedAt = new Date().toISOString();
  const book = books.findIndex((book) => book.id === id);
  const finished = pageCount == readPage ? true : false;
  if (typeof name == 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.statusCode = 400;
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.statusCode = 400;
    return response;
  };

  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    return response;
  } else if (book !== -1) {
    books[id] = {
      ...books[id],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.statusCode = 200;
    return response;
  }
};

const deleteBookById = (request, h) => {
  const {id} = request.params;
  const book = books.findIndex((book) => book.id === id);

  if (book !== -1) {
    books.splice(book, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.statusCode = 404;
    return response;
  };
};

module.exports = {defaultHomePage,
  postNewBook,
  showAllBook,
  getBookById,
  editBookById,
  deleteBookById};
