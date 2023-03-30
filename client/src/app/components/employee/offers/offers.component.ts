import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffer } from 'src/app/models/IOffer';
import { CandidateService } from 'src/app/services/candidate.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

    constructor(
        private candidateService: CandidateService,
        private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.offers$ = this.candidateService.offers;
    }

    selectedOffer: IOffer = {} as IOffer;
    offers$: Observable<IOffer[]>;
}
