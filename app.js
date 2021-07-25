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
        const storeBooks=[
            {
                tittle:"BOOk One",
                Author:"Johen",
                isbn:"365795"
            },
            {
                tittle:"BOOk Two",
                Author:"Alan",
                isbn:"365105"
            }
        ];
    
        const books=storeBooks;
        books.forEach((book) => UI.addBookToList(book));
       // UI.addBookToList(book);
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

static clearFeilds(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
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

     // instance a book
     const book =new Book(tittle,author,isbn);
     console.log(book);
  //   alert("Book Added");
     UI.addBookToList(book);
     // clear feilds
     UI.clearFeilds();
});


// remove event 
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
});



