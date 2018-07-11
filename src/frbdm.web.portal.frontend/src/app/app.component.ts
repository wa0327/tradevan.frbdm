import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.less']
})
export class AppComponent implements OnInit {
    showAdminMenu = false;

    constructor(
        private auth: AuthorizationService
    ) {
    }

    ngOnInit() {
        this.auth.isInRole('系統管理員').subscribe(result => {
            this.showAdminMenu = result;
        });
    }
}
