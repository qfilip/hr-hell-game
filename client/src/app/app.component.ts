import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SimulationService } from './services/simulation.service';
import { createAvatar } from '@dicebear/core';
import { lorelei, avataaars } from '@dicebear/collection';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
}
