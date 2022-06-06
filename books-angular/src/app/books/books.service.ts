import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators"
import { Book } from "../models/Book";
import { BookGenre } from "../models/BookGenre";

@Injectable()
export class BooksService{

 public books:Book[] = []

 constructor(private http:HttpClient){}

    getAllBooks():Observable<Book[]>{
      return this.http.get<Book[]>("http://localhost:13960/api/books")
      .pipe(catchError(this.handleError<Book[]>('getAllBooks')))
  }

    getBookById(id:number){
      return this.http.get<Book>("http://localhost:13960/api/books/" + id)
      .pipe(catchError(this.handleError<Book>('getBookById')))
  }

    getAllBookGenres():Observable<BookGenre[]>{
      return this.http.get<BookGenre[]>("http://localhost:13960/api/bookgenres")
      .pipe(catchError(this.handleError<BookGenre[]>('getAllBookGenres')))
  }

    insertBook(newBook:Book):Observable<Book>{
      const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      const body = JSON.stringify(newBook);
      return this.http.post<Book>("http://localhost:13960/api/books", body, options)
  }

    updateBook(updatedBook:Book):Observable<Book>{
      const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      const body = JSON.stringify(updatedBook);
      return this.http.put<Book>("http://localhost:13960/api/books", body, options)
  }

    removeBook(id:number){
      return this.http.delete("http://localhost:13960/api/books/" + id)
      .pipe(catchError(this.handleError<Book[]>('removeBook')))
  }


    private handleError<T>(operation = "operation", result?: T){ // defaultni parametar i opcioni
      return (error:any): Observable<T> => {
        console.error(error);
        return of(result as T);
      }
  }
}