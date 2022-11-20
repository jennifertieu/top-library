(function(window, document, undefined){
    "use strict";

    let myLibrary = [];

    let testBook1 = new Book("Brave", "Joe Brown", 200);
    let testBook2 = new Book("Goodbye", "Kat Tran", 200);
    
    addBookToLibrary(testBook1);
    addBookToLibrary(testBook2);
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

            let removeButton = document.createElement("button");
            removeButton.classList.add("btn", "remove-btn");
            removeButton.textContent = "Remove";

            newDiv.append(newTitle, newAuthor, readButton, removeButton);
            library.append(newDiv);
        });
    }

    // TODO: generate random hex
    function generateRandomHex(){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
    }

    // add new book
    document.getElementById("addBookForm").addEventListener("submit", function(event){
        let newBook = new Book(event.target.Title.value, event.target.Author.value, event.target.Pages.value);
        addBookToLibrary(newBook); 
        removeAllChildNodes(document.getElementById("library"));
        displayLibrary();
        return event.preventDefault();
    });

    // remove book
    Array.from(document.getElementsByClassName("remove-btn")).forEach(function(button){
        button.addEventListener("click", function(event){
            let bookIndex = this.parentElement.getAttribute("data-library-index");
            removeBookFromLibrary(bookIndex); 
            removeAllChildNodes(document.getElementById("library"));
            displayLibrary();
            return event.preventDefault();
        });

    })
    // toggles a book read status on Book's prototype isntance
    Array.from(document.getElementsByClassName("read-btn")).forEach(function(button){
        button.addEventListener("click", function(event){
            let bookIndex = this.parentElement.getAttribute("data-library-index");
            myLibrary[bookIndex].read();
        })
    })

    function Book(title, author, pages) {
        this.author = author;
        this.title = title;
        this.numberOfPages = pages;
        this.isRead = false;
        this.color = "#000";
    }

    Book.prototype.read = function(){
        this.isRead = !this.isRead;
        console.log(this.isRead);
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
})(window, document);