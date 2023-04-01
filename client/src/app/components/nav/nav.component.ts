import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {

    constructor(private router: Router) { }

    routes = [
        { route: 'projects-overview', text: 'Projects' },
        { route: 'employees-list', text: 'Employees' },
        { route: 'hire', text: 'Hiring' },
        { route: 'statistics', text: 'Statistics' }
    ];

    currentRoute = this.routes[0];
    
    navigateTo(route: string) {
        this.currentRoute = this.routes.find(x => x.route === route);
        this.router.navigate([`/${route}`]);
    }
}
