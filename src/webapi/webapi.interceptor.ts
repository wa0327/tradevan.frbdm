import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class WebapiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const res = next.handle(req);

        return res.pipe(tap((r: HttpEvent<any>) => {
            if (r instanceof HttpErrorResponse) {
                console.error(r);
                alert('呼叫 Web API 時發生錯誤！');
            } else if (r instanceof HttpResponse) {
                // console.log(r);
            }
        }));
    }
}
