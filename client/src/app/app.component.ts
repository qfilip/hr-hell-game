import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { createAvatar } from '@dicebear/core';
import { lorelei, avataaars } from '@dicebear/collection';
import { DomSanitizer } from '@angular/platform-browser';
import * as mock from './functions/mock.utils';
import { ProjectService } from './services/project.service';
import { EmployeeService } from './services/employee.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    constructor(
        private projectService: ProjectService,
        private employeesService: EmployeeService,
    ) {}

    ngOnInit(): void {
        mock.mockCompany();
        // this.projectService.projects.subscribe(console.log);
        // this.employeesService.employees.subscribe(console.log);
    }
    
}
