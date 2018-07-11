import { environment as env } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrentLogon } from './entities';

@Injectable()
export class AuthorizationService {
    constructor(
        private http: HttpClient) {
        env.apiInit.call(env, http);
    }

    authorize(role: string) {
        return Observable.create((observer: any) => {
            this.getLogon().subscribe(logon => {
                if (logon == null) {
                    alert('操作逾時，請重新操作。');
                    location.reload(true);
                } else if (!logon.roles.some(r => r == role)) {
                    alert('權限不足！即將導回首頁！');
                    location.href = '/';
                } else {
                    observer.next();
                }
            });
        });
    }

    isInRole(role: string): Observable<boolean> {
        return Observable.create((observer: any) => {
            this.getLogon().subscribe(logon => {
                if (logon != null && logon.roles.some(r => r == role)) {
                    observer.next(true);
                } else {
                    observer.next(false);
                }
            });
        });
    }

    private getLogon() {
        return this.http.get<CurrentLogon>(`${env.apiBaseUrl}/logon/current`);
    }
}