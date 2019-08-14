class Book {
    constructor(title, author, publisher) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
    }
}

class UI {
    static displayBooks() {
        const books = Store.getBooks()

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.classList.add('book-active');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.publisher}</td>
        <td class="delete-btn"><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#publisher').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        const getBooks = localStorage.getItem('books');

        getBooks === null ? books = [] : books = JSON.parse(localStorage.getItem('books'));

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const publisher = document.querySelector('#publisher').value;
    const book = new Book(title, author, publisher);

    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

document.querySelector('#del-list-btn').addEventListener('click', function () {
    const elem = document.getElementById("book-list");
    elem.parentNode.removeChild(elem);

    localStorage.removeItem('books');
});

function searchBook() {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("book-list");
    const books = table.getElementsByClassName("book-active");

    for (i = 0; i < books.length; i++) {
        const title = books[i].getElementsByTagName("td")[0];
        const author = books[i].getElementsByTagName("td")[1];
        const publisher = books[i].getElementsByTagName("td")[2];

        if (title || author || publisher) {
            const titleValue = title.textContent || title.innerText;
            const authorValue = author.textContent || author.innerText;
            const publisherValue = publisher.textContent || publisher.innerText;

            if (titleValue.toUpperCase().indexOf(filter) > -1) {
                books[i].style.display = "";
            } else if (authorValue.toUpperCase().indexOf(filter) > -1) {
                books[i].style.display = "";
            } else if (publisherValue.toUpperCase().indexOf(filter) > -1) {
                books[i].style.display = "";
            } else {
                books[i].style.display = "none";
            }
        }
    }
}
