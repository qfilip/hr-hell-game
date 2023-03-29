import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICandidate } from 'src/app/models/ICandidate';
import { HireService } from 'src/app/services/hire.service';

@Component({
    selector: 'hire',
    templateUrl: './hire.component.html',
    styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {

    constructor(private hireService: HireService) { }

    ngOnInit(): void {
        this.candidates$ = this.hireService.rooster
            .pipe(map(x => x));
    }
    
    candidates$: Observable<ICandidate[]>;

    
}
