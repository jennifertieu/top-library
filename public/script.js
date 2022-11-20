(function(window, document, undefined){
    "use strict";

    let myLibrary = [];

    displayLibrary();

    // TODO: function that loops through array and displays 
    // each book in a table or on their own "card"
    function displayLibrary(){
        myLibrary.forEach((book, index) => {
            let library = document.getElementById("library");

            let newDiv = document.createElement("div");
            newDiv.classList.add("book");
            newDiv.setAttribute("data-library-index", index);
            newDiv.style.backgroundColor = book.color = "#" + generateRandomHex();

            let newTitle = document.createElement("h1");
            newTitle.classList.add("title");
            newTitle.textContent = book.title;
            
            let newAuthor = document.createElement("div");
            newAuthor.classList.add("author");
            newAuthor.textContent = book.author;

            let readButton = document.createElement("button");
            readButton.classList.add("btn", "read-btn");
            readButton.textContent = "Read";
            readButton.addEventListener("click", readBookListener);

            let removeButton = document.createElement("button");
            removeButton.classList.add("btn", "remove-btn");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", removeBookListener);
            
            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("btn-container");

            buttonContainer.append(readButton, removeButton)

            let status = document.createElement("div");
            status.classList.add("status");
            status.textContent = book.isRead ? "Status: Completed" : "Status: Not Read";

            newDiv.append(newTitle, newAuthor, buttonContainer, status);
            library.append(newDiv);

        });
    }

    // add new book
    document.getElementById("addBookForm").addEventListener("submit", addBookListener);

    function Book(title, author, pages) {
        this.author = author;
        this.title = title;
        this.numberOfPages = pages;
        this.isRead = false;
        this.color = "#000";
    }

    Book.prototype.read = function(){
        this.isRead = !this.isRead;
    }

    function addBookListener(event){
        let newBook = new Book(event.target.Title.value, event.target.Author.value, event.target.Pages.value);
        addBookToLibrary(newBook); 
        removeAllChildNodes(document.getElementById("library"));
        displayLibrary();
        return event.preventDefault();
    }

    function removeBookListener(event){
        let bookIndex = event.target.closest(".book").getAttribute("data-library-index");
        removeBookFromLibrary(bookIndex); 
        removeAllChildNodes(document.getElementById("library"));
        displayLibrary();
        return event.preventDefault();
    }

    function readBookListener(event){
        let bookIndex = event.target.closest(".book").getAttribute("data-library-index");
        myLibrary[bookIndex].read();
        let status = event.target.closest(".book").querySelector(".status");
        status.textContent = myLibrary[bookIndex].isRead ? "Status: Completed" : "Status: Not Read";
    }

    // add book to library
    function addBookToLibrary(book) {
        myLibrary.push(book);
    }
    
    // remove book from library
    function removeBookFromLibrary(bookIndex) {
        myLibrary.splice(bookIndex, 1);
    }

    // move library nodes
    function removeAllChildNodes(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
    
    // generate random hex
    function generateRandomHex(){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
    }
})(window, document);