const books = require('./bookshelf');
const { v4: uuidv4 } = require('uuid');

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
  }

  const id = uuidv4();
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };
  books.push(newBook);

  return h.response({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: id } }).code(201);
};

const getBooks = () => ({
  status: 'success',
  data: { books: books.map(({ id, name, publisher }) => ({ id, name, publisher })) }
});

const getBooksbyId = (request, h) => {
  const book = books.find((b) => b.id === request.params.id);
  if (!book) {
    return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
  }
  return h.response({
    status: 'success',
    data: { book }
  }).code(200);
};

const editBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const bookIndex = books.findIndex((b) => b.id === request.params.id);

  if (bookIndex === -1) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' }).code(404);
  }

  if (!name) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
  }

  const updatedAt = new Date().toISOString();
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  return h.response({ status: 'success', message: 'Buku berhasil diperbarui' }).code(200);
};

const deleteBook = (request, h) => {
  const bookIndex = books.findIndex((b) => b.id === request.params.id);

  if (bookIndex === -1) {
    return h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404);
  }

  books.splice(bookIndex, 1);
  return h.response({ status: 'success', message: 'Buku berhasil dihapus' }).code(200);
};

module.exports = {
  addBooks,
  getBooks,
  getBooksbyId,
  editBooks,
  deleteBook
};
