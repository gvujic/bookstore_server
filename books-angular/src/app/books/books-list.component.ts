import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Toastr, TOASTR_TOKEN } from "../common/toastr.service";
import { Book } from "../models/Book";
import { BookGenre } from "../models/BookGenre";
import { BooksService } from "./books.service";

@Component({
    templateUrl:'books-list.component.html',
    styleUrls:['books-list.component.css']
})
export class BooksListComponent implements OnInit{

    books:Book[] = []
    filteredBooks:Book[] = []
    genres:BookGenre[] = []
    filteredGenres:BookGenre[] = []
    selectedBook:Book //= { author:'', title:'', description:'', price:0, pagesNumber:0, bookGenreId:0, id:undefined, showDetails:false}
    showDetails:boolean = false
    searchTerm:string = "";
    sortedViewEnabled:boolean = true;
    buttonTitle:string='Book list'

    byTitleChecked:boolean = true;
    byAuthorChecked:boolean = false;
    byPriceChecked:boolean = false;
    currentSortParam:string
    
    constructor(public bookService: BooksService,
        @Inject(TOASTR_TOKEN) private toastr: Toastr, 
        private route:ActivatedRoute){}

    ngOnInit(): void {
        console.log('onInit called')
       this.genres = this.route.snapshot.data['genres']
       this.books = this.route.snapshot.data['books']
       this.filteredBooks = this.books
    }

    updateData(){
        console.log("updateData")
        this.bookService.getAllBooks().subscribe(data =>{
            this.books = data;
            this.filteredBooks = this.books;
        });

        this.bookService.getAllBookGenres().subscribe(data => {
            this.genres = data
        })
    }

    closeDetailsWindow(){
        this.showDetails = false
        this.filteredBooks.forEach(function(part, index) {
            this[index].showDetails = false;
          }, this.filteredBooks)
    }

    deleteBook(book:Book){
        console.log("BooksListComponent - deleteBook 1: " + book.title)
        this.selectedBook = book;
    }

    deleteBook2(book:Book){
        console.log("BooksListComponent - deleteBook 2: " + book)

        if(this.selectedBook.id === book.id){
            this.showDetails = false;
        }
        this.bookService.removeBook(book.id).subscribe(data =>{
            this.books = this.books.filter(x => x.id !== book.id);
            this.filteredBooks = this.books;
            this.searchBooks(this.searchTerm);
            this.toastr.info("Book deleted")
        });
    }

    searchBooks(searchTerm:string){
        console.log("searchBooks by: " + searchTerm)
        this.searchTerm = searchTerm;
        this.filteredBooks = this.books
        if(searchTerm === ''){
            this.filteredBooks = this.books
        }else{
            this.filteredBooks = this.filteredBooks.filter(b => 
               b.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) 
            || b.author.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
            
            this.setGenres();
        }
    }

    setGenres():BookGenre[]{
        this.filteredGenres = []
        this.filteredBooks.forEach((book) => {
            if(this.filteredGenres.findIndex(g => g.id === book.bookGenreId) < 0){
                this.filteredGenres.push(this.genres.find(x => x.id == book.bookGenreId))
            }
        })
        return this.filteredGenres.filter((el, i, a) => i === a.indexOf(el));
    }

    clearFilter(){
        this.searchTerm = '';
        this.filteredBooks = this.books
        this.filteredGenres = this.genres.filter(g => {
            return g.books.length > 0;
        })
    }

    changeBooksView(){
        this.sortedViewEnabled = !this.sortedViewEnabled;
        if(this.sortedViewEnabled){
            this.buttonTitle='Books list'
        }else{
            this.buttonTitle='By genre'
        }
    }

    bookChangedHandler(id:number){
        this.setGenres();
        this.bookService.getAllBooks().subscribe(data => {
            this.books = data;
            this.filteredBooks = this.books;
            this.searchBooks(this.searchTerm);
            this.toastr.success("Updated: " + this.filteredBooks.find(b => b.id === id).title)
            this.handleRadioButton(this.currentSortParam, true);

        });
    }    

    handleRadioButton(sortParameter:string, isChanged:boolean = false){
        this.currentSortParam = sortParameter
        if(sortParameter === 'byTitle'){
            if(this.byTitleChecked == false || isChanged){
                this.byTitleChecked = !this.byTitleChecked
                this.byAuthorChecked = !this.byTitleChecked
                this.byPriceChecked = !this.byTitleChecked
                this.filteredBooks.sort(sortByTitleAsc)
            }  
        }
        else if(sortParameter === 'byAuthor'){
            if(this.byAuthorChecked == false || isChanged){
                this.byAuthorChecked = !this.byAuthorChecked
                this.byTitleChecked = !this.byAuthorChecked
                this.byPriceChecked = !this.byAuthorChecked
                this.filteredBooks.sort(sortByAuthoreAsc)
            }   
        }
        else{
            if(this.byPriceChecked == false || isChanged){
                this.byPriceChecked = !this.byPriceChecked
                this.byAuthorChecked = !this.byPriceChecked
                this.byTitleChecked = !this.byPriceChecked
                this.filteredBooks.sort(sortByPriceDesc)
            }
        }
    }
}


function sortByTitleAsc(b1:Book, b2:Book){
    if(b1.title > b2.title) return 1
    else if(b1.title === b2.title) return 0
    else return -1
}
function sortByAuthoreAsc(b1:Book, b2:Book){
    if(b1.author > b2.author) return 1
    else if(b1.author === b2.author) return 0
    else return -1
}
function sortByPriceDesc(b1:Book, b2:Book){
    return b2.price - b1.price 
  }
