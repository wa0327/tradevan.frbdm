import { environment as env } from '../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorizationService } from '../authorization.service';
import { UserItem } from '../entities';

@Component({
    selector: 'app-user-edit',
    templateUrl: 'user-edit.component.html',
    styleUrls: ['user-edit.component.less']
})
export class UserEditComponent implements OnInit {

    title: string;
    user: UserItem;

    constructor(
        private auth: AuthorizationService,
        private route: ActivatedRoute,
        private location: Location,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        this.auth.authorize('系統管理員').subscribe(() => {
            switch (this.location.path(false)) {
                case '/add-user':
                    document.title = '使用者新增 - FRBDM';
                    this.title = '使用者新增';
                    this.user = {
                        account: '',
                        name: '',
                        department: '',
                        groupId: "A8309AC1-EA48-43EE-A6BE-D97CFD7065AA",
                        enabled: true
                    };
                    break;

                default:
                    document.title = '使用者編輯 - FRBDM';
                    this.title = '使用者編輯';
                    const q = this.route.snapshot.params;
                    const userId = parseInt(q['userId']);
                    this.load(userId);
                    break;
            }
        });
    }

    save() {
        this.http.post<void>(`${env.apiBaseUrl}/user`, this.user).subscribe(() => {
            alert('儲存成功！');
            document['UserSearchComponent_refresh'] = true;
            this.location.back();
        });
    }

    cancel() {
        this.location.back();
    }

    private load(userId: number) {
        this.http.get<UserItem>(`${env.apiBaseUrl}/users/${userId}`).subscribe(user => {
            this.user = user;
        });
    }
}
