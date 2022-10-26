(function(window, document, undefined){
    let myLibrary = [];

    let testBook1 = new Book("Joe Brown", "Brave", 200);
    let testBook2 = new Book("Kat Tran", "Goodbye", 200);
    
    addBookToLibrary(testBook1);
    addBookToLibrary(testBook2);

    // TODO: function that loops through array and displays 
    // each book in a table or on their own "card"

    // TODO: add event listener for "ADD BOOK" button
    // TODO: add event listener to remove book
    // TOOD: create function that toggles a book read status on Book's prototype isntance

    function Book(author, title, pages) {
        this.author = author;
        this.title = title;
        this.numberOfPages = pages;
        this.isRead = false;
    }

    Book.prototype.read = function(){
        this.isRead = !this.isRead;
        console.log(this.isRead);
    }

    function addBookToLibrary(book) {
        myLibrary.push(book);
    }
    
    function removeBookFromLibrary(book) {
        myLibrary.filter(libBook => libBook !== book);
    }
})(window, document);