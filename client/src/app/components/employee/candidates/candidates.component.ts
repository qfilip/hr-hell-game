import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ICandidate } from 'src/app/models/ICandidate';
import { IOffer } from 'src/app/models/IOffer';
import { CandidateService } from 'src/app/services/candidate.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogComponent } from '../../dialog/dialog.component';
import * as utils from '../../../functions/utils';
import * as candidateUtils from '../../../functions/candidate-service.utils';

@Component({
  selector: 'candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

    @ViewChild('appDialog') appDialog: DialogComponent;
    
    constructor(
        private candidateService: CandidateService,
        private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.candidates$ = this.candidateService.candidates;
    }
    
    selectedCandidate: ICandidate = { employee: {}} as ICandidate;
    candidates$: Observable<ICandidate[]>;

    openOfferDialog(c: ICandidate) {
        this.selectedCandidate = c;
        this.appDialog.open();
    }

    sendOffer(offeredSalaryStr: string, candidate: ICandidate) {
        const offeredSalary = parseInt(offeredSalaryStr);

        const offer: IOffer = {
            candidate: candidate,
            offeredSalary: offeredSalary,
            daysInQueue: 0,
            daysUntilResponse: utils.makeRandomNumber(0, 10),
            chanceToAccept: candidateUtils.computeOfferAcceptanceChance(offeredSalary, candidate)
        }

        this.candidateService.removeCandidate(candidate);
        this.candidateService.addOffers(offer);
    }

    closeOfferDialog() {
        this.appDialog.close();
    }

}
