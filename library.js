// Array to store all book objects
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID(); // Unique identifier for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Prototype method to toggle read status
Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

// Function to add book to library
function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to display books
function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    
    // Clear existing books before re-rendering
    libraryContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.bookId = book.id;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read Status: ${book.isRead ? 'Read' : 'Not Read'}</p>
            <div class="book-actions">
                <button class="toggle-read-btn">Toggle Read Status</button>
                <button class="remove-book-btn">Remove Book</button>
            </div>
        `;

        // Add event listener for removing book
        const removeBtn = bookCard.querySelector('.remove-book-btn');
        removeBtn.addEventListener('click', () => {
            const bookIndex = myLibrary.findIndex(b => b.id === book.id);
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
                displayBooks();
            }
        });

        // Add event listener for toggling read status
        const toggleReadBtn = bookCard.querySelector('.toggle-read-btn');
        toggleReadBtn.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });

        libraryContainer.appendChild(bookCard);
    });
}

// Setup new book dialog and form
document.addEventListener('DOMContentLoaded', () => {
    const newBookDialog = document.getElementById('new-book-dialog');
    const newBookBtn = document.getElementById('new-book-btn');
    const newBookForm = document.getElementById('new-book-form');
    const closeDialogBtn = document.getElementById('close-dialog-btn');

    // Open dialog
    newBookBtn.addEventListener('click', () => {
        newBookDialog.showModal();
    });

    // Close dialog
    closeDialogBtn.addEventListener('click', () => {
        newBookDialog.close();
    });

    // Handle form submission
    newBookForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;
        const pages = document.getElementById('book-pages').value;
        const isRead = document.getElementById('book-read').checked;

        addBookToLibrary(title, author, pages, isRead);
        
        // Reset form and close dialog
        newBookForm.reset();
        newBookDialog.close();
    });

    // Add some initial books to test
    addBookToLibrary('1984', 'George Orwell', 328, false);
    addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
});