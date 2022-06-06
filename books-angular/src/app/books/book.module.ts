import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list.component';
import { InsertBookComponent } from './insert-book.component';
import { BookItemComponent } from './book-item.component';
import { EditBookComponent } from './edit-book.component';
import { GenreNamePipe } from './genre-name.pipe';
import { BooksService } from './books.service';
import { JQ_TOKEN } from '../common/jQuery.service';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimpleModalComponent } from '../common/simple-modal.component';
import { ModalTriggerDirective } from '../common/modal-trigger.directive';
import { RouterModule } from '@angular/router';
import { booksAppRoutes } from './books-routes';
import { DeleteBookComponent } from './delete-book.component';
import { CollapsibleWellComponent } from '../common/collapsible-well.component';
import { BooksGenresResolver } from './books-genres.resolver.service';
import { BookListResolver } from './book-list.resolver.service';

let jQuery = window['$'];
let toastr:Toastr = window['toastr']

@NgModule({
  declarations: [
    BooksListComponent,
    InsertBookComponent,
    EditBookComponent,
    BookItemComponent,
    GenreNamePipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    DeleteBookComponent,
    CollapsibleWellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(booksAppRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  providers:[
    BooksService,
    {provide: JQ_TOKEN, useValue:jQuery},
    { provide: TOASTR_TOKEN, useValue:toastr },
    BooksGenresResolver,
    BookListResolver
  ]
})
export class BookModule { }
