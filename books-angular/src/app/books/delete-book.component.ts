import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Book } from "../models/Book";

@Component({
    selector:'delete-book',
    templateUrl:'delete-book.component.html',
    styles:[`
    .img_list{
    height: 200px;
    width: 140px;
  }`]
})
export class DeleteBookComponent {
    @Input() book:Book
    @Output() bookDeleteConfirmed = new EventEmitter();
    
    deleteBookConfirm(deleteBook:Book){
        console.log("DeleteBookComponent - deleteBookConfirm (emit):  " + deleteBook.title)
        this.bookDeleteConfirmed.emit(deleteBook);
    }
}