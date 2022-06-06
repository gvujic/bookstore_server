import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { JQ_TOKEN } from "../common/jQuery.service";
import { Book } from "../models/Book";
import { BookGenre } from "../models/BookGenre";
import { BooksService } from "./books.service";

@Component({
    selector:'edit-book',
    templateUrl:'edit-book.component.html',
    styleUrls:['edit-book.component.css']
})
export class EditBookComponent{
    editBookForm:FormGroup
    @Input() genres:BookGenre[]
    @Input() set book(book:Book){
        this.editBookForm.setValue(book)}

    @Output() bookChanged = new EventEmitter()

    constructor(private bookService:BooksService,
        @Inject(JQ_TOKEN) private $:any){
        this.editBookForm = new FormGroup({
            title: new FormControl('', Validators.required),
            author: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
            pagesNumber: new FormControl('',  [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
            bookGenreId: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl('',  [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
            id: new FormControl('')
        })
        }

    saveBook2(){
        this.bookChanged.emit(this.editBookForm.value)
    }
}