import { NgModule, InjectionToken, ClassProvider, Type } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';
import { environment as env } from '../environments/environment';
import { WebapiInterceptor } from './webapi.interceptor';
import { IWebapiInterface } from './webapi.interface';
import { WebapiService } from './webapi.service';
import { MockWebapiService } from './mock-webapi.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: WebapiInterceptor, multi: true },
        {
            provide: WebapiService,
            useFactory: (http: HttpClient) => {
                if (env.useMockData) {
                    return new MockWebapiService();
                } else {
                    return new WebapiService(http);
                }
            },
            deps: [HttpClient]
        }
    ]
})
export class WebapiModule {
}