import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'percent-bar',
    templateUrl: './percent-bar.component.html',
    styleUrls: ['./percent-bar.component.css']
})
export class PercentBarComponent {
    @Input('name') name: string;
    @Input('val') val: number;
}
