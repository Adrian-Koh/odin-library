const myLibrary = [];
const body = document.querySelector('body');
const form = document.querySelector('form');
const booksContainer = document.querySelector('#books-container');
const submit = document.querySelector('#submit');
const newBookBtn = document.querySelector('#new-book');

function Book(title, author, pages) {
    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    let book = new Book(title, author, pages);
    myLibrary.push(book);
}

function displayBooks() {
    booksContainer.innerHTML = '';
    for (const book of myLibrary) {
        const div = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');

        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages;
        
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.id = 'book';

        booksContainer.append(div);
    }
}


newBookBtn.addEventListener('click', () => {
    body.prepend(form);
    body.removeChild(newBookBtn);
});

submit.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    
    addBookToLibrary(title, author, pages);
    displayBooks();

    body.removeChild(form);
    body.prepend(newBookBtn);
});

body.removeChild(form);

addBookToLibrary('Harry Potter', 'J.K Rowling', 295);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
displayBooks();



