import { Location } from '@angular/common';
import { WebapiService } from '../webapi/webapi.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService {
    constructor(
        private api: WebapiService) {
    }

    authorize(role: string) {
        return Observable.create((observer: any) => {
            this.api.getLogon().subscribe(logon => {
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
}