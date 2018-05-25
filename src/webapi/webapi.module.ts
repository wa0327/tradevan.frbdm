import { NgModule, InjectionToken, ClassProvider, Type } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/compiler/src/core';
import { environment as env } from '../environments/environment';
import { WebapiInterceptor } from './webapi.interceptor';
import { IWebapiInterface } from './webapi.interface';
import { WebapiService } from './webapi.service';
import { MockWebapiService } from './mock-webapi.service';

const WEBAPI_SERVICE = new InjectionToken<IWebapiInterface>('desc');

const providers: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: WebapiInterceptor, multi: true }
];
if (navigator.userAgent.indexOf('MSIE 9.0') !== -1) {
    if (env.production) {
        providers.push(WebapiService);
    } else {
        providers.push({ provide: WebapiService, useClass: MockWebapiService });
    }
} else {
    providers.push(WebapiService);
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: providers
})
export class WebapiModule {
}