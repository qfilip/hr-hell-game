import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    @ViewChild('dialog') dialog: ElementRef<any>;
    
    open() {
        this.dialog.nativeElement.showModal();
    }

    close() {
        this.dialog.nativeElement.close();
    }
}
