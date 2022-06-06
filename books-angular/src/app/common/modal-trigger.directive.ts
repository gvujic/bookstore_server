import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Directive({
    selector:'[modal-trigger]' // this is an attribute (not an element)
})

export class ModalTriggerDirective implements OnInit{
    private element: HTMLElement;
    @Input('modal-trigger') modalId:string;

    constructor(private ref:ElementRef, // When this directive is constructed i also want reference to the element that it is on
                @Inject(JQ_TOKEN) private $: any){
        this.element = ref.nativeElement;
    }

    public closeModal(){
        this.$(this.ref.nativeElement).modal('hide')
    }

    ngOnInit(): void {
        this.element.addEventListener('click', e =>{
            this.$(`#${this.modalId}`).modal({})
        })
    }
}