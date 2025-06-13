const myLibrary = [];


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
    const body = document.querySelector('body');

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

        body.append(div);
    }
}


addBookToLibrary('Harry Potter', 'J.K Rowling', 295);
addBookToLibrary('The Art of War', 'Sun Tzu', 1020);
displayBooks();



