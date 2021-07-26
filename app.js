//BOOK Class to Represent Book
// UI Class Hnadle UI tasks on index.html
// Store Class Handle the Storage add or remove
// Event : Display , Add and Remove it 

//1 Class Book

class Book{
    constructor(tittle,Author,isbn){
        this.Author=Author;
        this.isbn=isbn;
        this.tittle=tittle; 
    }
}

//2 UI that have method that intract the javascript code to UI
class UI{
    static displayBooks(){
     
        const books=Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
        }
    static addBookToList(book){
        const list=document.querySelector("#book-list");
        const row=document.createElement('tr');
        row.innerHTML= `
        <td>${book.tittle}</td>
        <td>${book.Author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
        
    }


    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

static clearFeilds(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
}
}

// store data get data in local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        
        return books;
    }

    static addBooks(book){
        const books=Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBooks(isbn){
        const books=Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
        
    }
}

// event handler
// add the event on display a the book
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    // defullt action
    e.preventDefault();//to stop it

     // get the from value like tittle auther than pass to the add the book 
     const tittle=document.querySelector('#title').value;
     const author=document.querySelector('#author').value;
     const isbn=document.querySelector('#isbn').value; 
    // validation 
    if(tittle === '' || author === '' ||  isbn=== ''){
        UI.showAlert("Please fill the Feilds",'danger');
    }
    else{
       
     // instance a book
     const book =new Book(tittle,author,isbn);
     console.log(book);
  //   alert("Book Added");
     UI.addBookToList(book);
     // add book to store
     Store.addBooks(book);
     // show successful msg
     UI.showAlert("BOOK Added Successfully",'success');
     // clear feilds
     UI.clearFeilds();
    }
});


// remove event 
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    // remove form local storage
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("BOOK Deleted Successfully",'success');
});



