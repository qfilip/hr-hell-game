import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { createAvatar } from '@dicebear/core';
import { lorelei, avataaars } from '@dicebear/collection';
import { DomSanitizer } from '@angular/platform-browser';
import * as mock from './functions/mock.utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        mock.mockCompany();
    }
    
}
