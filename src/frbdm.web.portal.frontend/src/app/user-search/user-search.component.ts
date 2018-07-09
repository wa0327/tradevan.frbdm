import { Component, Input, OnInit } from '@angular/core';
import { WebapiService } from '../../webapi/webapi.service';
import { UserSearchResult } from '../../webapi/entities';
import { AuthorizationService } from '../authorization.service';

@Component({
    selector: 'app-user-search',
    templateUrl: 'user-search.component.html',
    styleUrls: ['user-search.component.less']
})
export class UserSearchComponent implements OnInit {

    @Input() account: string;
    @Input() name: string;

    result: UserSearchResult;

    constructor(
        private auth: AuthorizationService,
        private api: WebapiService
    ) {
    }

    ngOnInit() {
        this.auth.authorize('系統管理員');
        document.title = '使用者查詢 - FRBDM';
        if (this.api.getLogon())
        this.restore();
    }

    search() {
        this.api.searchUsers(this.account, this.name).subscribe(result => {
            this.result = result;
            this.backup();
        });
    }

    private backup() {
        document['UserSearchComponent_data'] = {
            account: this.account,
            name: this.name,
            result: this.result
        };
    }

    private restore() {
        const data = document['UserSearchComponent_data'];
        if (data) {
            this.account = data.account;
            this.name = data.name;
            const refresh = document['UserSearchComponent_refresh'] as boolean;
            if (refresh) {
                delete document['UserSearchComponent_refresh'];
                this.search();
            } else {
                this.result = data.result;
            }
        }
    }
}
