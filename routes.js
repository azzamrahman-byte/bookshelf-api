const {
  addBooks,
  getBooks,
  getBooksbyId,
  editBooks,
  deleteBook,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBooksbyId,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBooks,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
];

module.exports = routes;
