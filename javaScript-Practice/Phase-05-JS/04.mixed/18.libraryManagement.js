let library = [
  {
    id: 1,
    title: "Atomic Habits",
    borrowed: false,
  },
];

function addBook(book) {
  library.push(book);
  return library;
}

function borrowBook(id) {
  let bookId = library.findIndex((s) => s.id === id);
  if (bookId === -1) {
    return "book not found";
  }
  if (library[bookId].borrowed == false) {
    library[bookId].borrowed = true;
  } else {
    return "Book already borrowed";
  }
  return library;
}
function returnBook(id) {
  let bookId = library.findIndex((s) => s.id === id);
  if (bookId === -1) {
    return "book not found";
  }
  if (library[bookId].borrowed == true) {
    library[bookId].borrowed = false;
  } else {
    return "Book already returned";
  }
  return library;
}
function showAvailableBooks() {
  return library.filter((book) => book.borrowed == false);
}
let book1 = {
  id: 2,
  title: "Rich Dad",
  borrowed: false,
};
let book2 = {
  id: 3,
  title: "Harry Potter",
  borrowed: false,
};
console.log(addBook(book1));
console.log(addBook(book2));

console.log(borrowBook(1));
console.log(returnBook(2));