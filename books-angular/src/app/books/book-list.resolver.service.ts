import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { BooksService } from "./books.service";
import { map } from 'rxjs/operators';
import { Book } from "../models/Book";

@Injectable()
export class BookListResolver implements Resolve<Book[]>{

    constructor(private bookService:BooksService){}

    resolve() {
        console.log('book resolver called')
        return this.bookService.getAllBooks().pipe(map(genres => genres))
    }
}