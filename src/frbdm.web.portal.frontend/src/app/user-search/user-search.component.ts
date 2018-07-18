import { environment as env } from '../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSearchResult } from '..//entities';
import { AuthorizationService } from '../authorization.service';

@Component({
    selector: 'app-user-search',
    templateUrl: 'user-search.component.html',
    styleUrls: ['user-search.component.less']
})
export class UserSearchComponent implements OnInit {

    account: string;
    name: string;
    result: UserSearchResult;

    constructor(
        private auth: AuthorizationService,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        document.title = '使用者查詢 - FRBDM';
        this.auth.authorize('系統管理員').subscribe(() => {
            this.restore();
        });
    }

    search() {
        const args = {
            account: this.account,
            name: this.name
        };
        this.http.get<UserSearchResult>(`${env.apiBaseUrl}/users?${$.param(args)}`).subscribe(result => {
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
