const myLibrary = [];
const body = document.querySelector('body');
const form = document.querySelector('form');
const booksContainer = document.querySelector('#books-container');
const submit = document.querySelector('#submit');
const newBookBtn = document.querySelector('#new-book');

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.ToggleRead = function() {
        this.read = !this.read;
    }

function addBookToLibrary(title, author, pages, read) {
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

        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages;
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
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    body.removeChild(form);
    body.prepend(newBookBtn);
});

body.removeChild(form);

addBookToLibrary('Harry Potter', 'J.K Rowling', 295, true);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020, false);
addBookToLibrary('Book A', 'John Doe', 20, true);
addBookToLibrary('How to Make Friends', 'Jane Doe', 100, false);
displayBooks();