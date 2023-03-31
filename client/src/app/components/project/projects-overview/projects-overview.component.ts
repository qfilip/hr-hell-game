import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/models/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'projects-overview',
    templateUrl: './projects-overview.component.html',
    styleUrls: ['./projects-overview.component.css']
})
export class ProjectsOverviewComponent implements OnInit {

    constructor(
        private router: Router,
        private projectService: ProjectService) { }

    ngOnInit(): void {
        this.projects$ = this.projectService.projects;
        this.proposals$ = this.projectService.proposals;
    }

    projects$: Observable<IProject[]>;
    proposals$: Observable<IProject[]>;

    acceptProposal(p: IProject) {
        this.projectService.removeProposal(p);
        this.projectService.addProjects(p);
    }

    viewProjectDetails(projectId: string) {
        const queryParams = {
            projectId: projectId
        };
        this.router.navigate([`/project-details`], { queryParams } )
    }

    manageEmployees(p) {
        
    }
}
