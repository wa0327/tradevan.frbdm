import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { WebapiService } from '../webapi/webapi.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.less']
})
export class AppComponent implements OnInit {
    showAdminMenu = false;

    constructor(
        private api: WebapiService
    ) {
    }

    ngOnInit() {
        this.api.getLogon().subscribe(logon => {
            if (logon != null) {
                this.showAdminMenu = logon.roles.some(r => r == '系統管理員');
            }
        });
    }
}
