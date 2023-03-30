import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ICandidate } from 'src/app/models/ICandidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
    selector: 'hire',
    templateUrl: './hire.component.html',
    styleUrls: ['./hire.component.css']
})
export class HireComponent {
    constructor() { }

    activeComponent: 'candidates' | 'offers' = 'candidates';

    setActiveComponent(x: 'candidates' | 'offers') {
        this.activeComponent = x;
    }
}
