import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/models/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'projects-overview',
    templateUrl: './projects-overview.component.html',
    styleUrls: ['./projects-overview.component.css']
})
export class ProjectsOverviewComponent implements OnInit {

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.projects$ = this.projectService.projects;
        this.proposals$ = this.projectService.proposals;
    }

    projects$: Observable<IProject[]>;
    proposals$: Observable<IProject[]>;

    acceptProposal(p: IProject) {
        this.projectService.removeProposal(p);
        this.projectService.addProject(p);
    }

    manageEmployees(p) {
        
    }
}
