import { Routes } from "@angular/router"
import { BookListResolver } from "./book-list.resolver.service";
import { BooksGenresResolver } from "./books-genres.resolver.service";
import { BooksListComponent } from "./books-list.component";
import { InsertBookComponent } from "./insert-book.component";

export const booksAppRoutes:Routes = [
    { 
        path:'list', 
        component: BooksListComponent,
        resolve: 
                { genres: BooksGenresResolver,
                  books: BookListResolver
                }
    },
    { path:'new', component: InsertBookComponent},
]