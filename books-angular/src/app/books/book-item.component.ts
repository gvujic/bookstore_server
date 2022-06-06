import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { Toastr, TOASTR_TOKEN } from "../common/toastr.service";
import { Book } from "../models/Book";
import { BookGenre } from "../models/BookGenre";
import { BooksService } from "./books.service";

@Component({
    selector:'book-item',
    templateUrl:'book-item.component.html',
    styleUrls:['book-item.component.css']
})
export class BookItemComponent implements OnInit{
    @Input() book:Book
    @Output() bookUpdateEvent = new EventEmitter
    deleteBookObj:Book
    genres:BookGenre[]

    constructor(private bookService:BooksService,
        @Inject(TOASTR_TOKEN) private toastr: Toastr){}

    ngOnInit(): void {
        this.bookService.getAllBookGenres().subscribe(data => {
            this.genres = data
        })
    }

    bookChangedHandler(book:Book){
        console.log("BookItemComponent - bookChangedHandler: " + book.title)
        console.table(book)
        this.bookService.updateBook(book).subscribe(data => {
            this.bookUpdateEvent.emit(book)
            }
        );
    } 

    deleteBookService(bookDelete:Book){
        console.log("BookItemComponent - deleteBookService: " + bookDelete.title)
        this.bookService.removeBook(bookDelete.id).subscribe(() =>{
            this.toastr.success("Book deleted: " + bookDelete.title)
            this.bookUpdateEvent.emit(bookDelete)
        });
    }
}