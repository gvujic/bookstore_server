import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { BooksService } from "./books.service";
import { map } from 'rxjs/operators';
import { BookGenre } from "../models/BookGenre";

@Injectable()
export class BooksGenresResolver implements Resolve<BookGenre[]>{

    constructor(private bookService:BooksService){}

    resolve() {
        console.log('genres resolver called')
        return this.bookService.getAllBookGenres().pipe(map(genres => genres))
    }
}