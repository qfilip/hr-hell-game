import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICandidate } from 'src/app/models/ICandidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'hire',
    templateUrl: './hire.component.html',
    styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {

    constructor(
        private candidateService: CandidateService,
        private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.candidates$ = this.candidateService.candidates;
    }
    
    candidates$: Observable<ICandidate[]>;

    makeOffer(c: ICandidate) {
        this.candidateService.removeCandidate(c);
        this.employeeService.addEmployee(c.employee);
    }
}
