import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            withCredentials: true
        });

        const res = next.handle(req);

        return res.pipe(catchError(error => {
            console.error(error);

            if (error.status == 401) {
                alert(`Web API 回應未授權，請重新整理後再試。`);
            } else {
                alert(`呼叫 ${req.url} 時發生錯誤！`);
            }
            
            return of(null);
        }));
    }
}
