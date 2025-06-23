const myLibrary = [];
const body = document.querySelector('body');
const form = document.querySelector('form');
const booksContainer = document.querySelector('#books-container');
const submit = document.querySelector('#submit');
const newBookBtn = document.querySelector('#new-book');

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    ToggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    booksContainer.innerHTML = '';
    
    for (const book of myLibrary) {
        const div = document.createElement('div');
        const title = document.createElement('span');
        const author = document.createElement('span');
        const pages = document.createElement('span');
        const read = document.createElement('span');

        title.id = 'book-title';
        author.id = 'book-author';
        pages.id = 'book-pages';
        read.id = 'book-read';

        title.innerText = "\"" + book.title + "\"";
        author.innerText = "by " + book.author;
        pages.innerText = book.pages + " pages";
        read.innerText = book.read ? "Already read" : "Not read yet";
        
        const removeButton = document.createElement('button');
        removeButton.id = 'remove-button';
        removeButton.innerText = 'Remove book';
        removeButton.bookId = book.id;
        removeButton.addEventListener('click', () => {
            let removeIndex = 0;

            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id === book.id) {
                    removeIndex = i;
                    break;
                }
            }

            myLibrary.splice(removeIndex, 1);
            displayBooks();
        });

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.id = 'toggle-read-button';
        toggleReadBtn.innerText = 'Toggle read status';
        toggleReadBtn.addEventListener('click', () => {
            book.ToggleRead();
            read.innerText = book.read ? "Already read" : "Not read yet";
        });

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read);
        div.appendChild(removeButton);
        div.appendChild(toggleReadBtn);
        div.id = 'book';

        booksContainer.append(div);
    }
}

newBookBtn.addEventListener('click', () => {
    body.prepend(form);
    body.removeChild(newBookBtn);
});

submit.addEventListener('click', () => {
    const read = document.querySelector('#read');

    if (!setValidityMessage(title, 'Title'))
        return;
    if (!setValidityMessage(author, 'Author'))
        return;
    if (!setValidityMessage(pages, 'Pages'))
        return;
    
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;

    body.removeChild(form);
    body.prepend(newBookBtn);
});

body.removeChild(form);

function setValidityMessage(item, label) {
    if (item.validity.tooShort) {
        item.setCustomValidity(`${label} is too short. Please enter a valid value between 8 and 50 characters.`);
        return false;
    }
    else if (item.validity.rangeUnderflow) {
        item.setCustomValidity(`${label} is too small. Please enter a valid value between 20 and 10000.`);
        return false;
    }
    else if (item.validity.rangeOverflow) {
        item.setCustomValidity(`${label} is too large. Please enter a valid value between 20 and 10000.`);
        return false;
    }
    else {
        item.setCustomValidity("");
        return true;
    }
}

const title = form.querySelector('#title');
title.addEventListener('input', () => {
    setValidityMessage(title, 'Title');
});

const author = form.querySelector('#author');
author.addEventListener('input', () => {
    setValidityMessage(author, 'Author');
});

const pages = form.querySelector('#pages');
pages.addEventListener('input', () => {
    setValidityMessage(pages, 'Pages');
});


addBookToLibrary('Harry Potter', 'J.K Rowling', 295, true);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020, false);
addBookToLibrary('Book A', 'John Doe', 20, true);
addBookToLibrary('How to Make Friends', 'Jane Doe', 100, false);
displayBooks();