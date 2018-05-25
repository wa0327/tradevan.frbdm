import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebapiInterceptor } from './webapi.interceptor';
import { IWebapiInterface } from './webapi.interface';
import { WebapiService } from './webapi.service';
import { MockWebapiService } from './mock-webapi.service';

const WEBAPI_SERVICE = new InjectionToken<IWebapiInterface>('desc');

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: WebapiInterceptor, multi: true },
        { provide: WebapiService, useClass: MockWebapiService }
    ]
})
export class WebapiModule {
}