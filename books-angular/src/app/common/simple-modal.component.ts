import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core"
import { __importDefault } from "tslib";
import { JQ_TOKEN } from "./jQuery.service";

@Component({
    selector:'simple-modal',
    templateUrl:'simple-modal.component.html',
    styles:[`
    .modal-body { height: 600px;  }
`]
})
export class SimpleModalComponent{
    @Input() title:string
    @Input() elementId:string
    @ViewChild('modalContainer') containerEl:ElementRef

    constructor(@Inject(JQ_TOKEN) private $:any){}

    closeModal(){
        this.$(this.containerEl.nativeElement).modal('hide')
    }
}