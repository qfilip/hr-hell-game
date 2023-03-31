import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, first, map, single, take } from 'rxjs';
import { IProject } from 'src/app/models/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService) { }


  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(ps => {
      const projectId = ps.get('projectId');
      this.project$ = this.projectService.projects
        .pipe(
          map(x => x.filter(p => p.id === projectId)[0]),
        );
    });
  }

  project$: Observable<IProject>;
}
