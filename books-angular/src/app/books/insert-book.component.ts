import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Toastr, TOASTR_TOKEN } from "../common/toastr.service";
import { Book } from "../models/Book";
import { BookGenre } from "../models/BookGenre";
import { BooksService } from "./books.service";

@Component({
    templateUrl:'insert-book.component.html',
    styles:[`
    em { color:#E05C65; padding-left:10px; float:right; }
    .error input, .error select, .error textarea { background-color:#E3C3C5; }
    .error ::-webkit-input-placeholder { color:#999; }
    .error ::-moz-placeholder { color:#999; }
    .error :-moz-placeholder { color:#999; }
`]
})
export class InsertBookComponent implements OnInit{

    newBookForm: FormGroup
    title: FormControl
    author: FormControl
    pagesNumber: FormControl
    bookGenre:FormControl
    description:FormControl
    price:FormControl

    genres:BookGenre[] = []

    

    constructor(@Inject(TOASTR_TOKEN) private toastr: Toastr,
                private booksService: BooksService,
                private router:Router){}

    saveBook(formValues){
        let book:Book = {
            id:undefined,
            title: formValues.title,
            author: formValues.author,
            pagesNumber: +formValues.pagesNumber,
            description:formValues.description,
            price:formValues.price,
            bookGenreId:formValues.bookGenre,
        }

        this.booksService.insertBook(book).subscribe(data => {
            console.log(data);
            this.router.navigate(['/books/list'])
          },
  
      error => {
          console.log('Log the error here: ', error);
      });

      this.toastr.success("Saved: " + book.title)

    }

    ngOnInit(): void {
        this.booksService.getAllBookGenres().subscribe(data =>{
            this.genres = data;
        })

        this.title = new FormControl('', Validators.required)
        this.author = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.pagesNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)])
        this.bookGenre = new FormControl('', Validators.required)
        this.description = new FormControl('', Validators.required)
        this.price = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)])

        this.newBookForm = new FormGroup({
            title: this.title,
            author: this.author,
            pagesNumber: this.pagesNumber,
            bookGenre: this.bookGenre,
            description: this.description,
            price:this.price
        })
    }

    cancel(){
        this.router.navigate(['/books'])
    }
}