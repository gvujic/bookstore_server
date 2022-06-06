import { Pipe, PipeTransform } from "@angular/core";
import { BookGenre } from "../models/BookGenre";

@Pipe({name:'genreName'})
export class GenreNamePipe implements PipeTransform{    
    transform(value: number, args:BookGenre[]):string {

        return args.find(x => {
            return x.id == value
        })?.name
    }
}