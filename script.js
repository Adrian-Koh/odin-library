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
    if (title.length === 0) {
        alert('Title is empty, unable to add book.');
        return;
    }
        
    if (author.length === 0) {
        alert('Author is empty, unable to add book.');
        return;
    }
        
    if (!pages) {
        alert('Invalid pages value, unable to add book.');
        return;
    }

    let book = new Book(title, author, pages);
    myLibrary.push(book);
}

function displayBooks() {
    booksContainer.innerHTML = '';
    for (const book of myLibrary) {
        const div = document.createElement('div');
        const title = document.createElement('span');
        const author = document.createElement('span');
        const pages = document.createElement('span');

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
    
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';

    addBookToLibrary(title, author, pages);
    displayBooks();

    body.removeChild(form);
    body.prepend(newBookBtn);

});

body.removeChild(form);

addBookToLibrary('Harry Potter', 'J.K Rowling', 295);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
displayBooks();



