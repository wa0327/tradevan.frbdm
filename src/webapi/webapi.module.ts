import { NgModule, InjectionToken, ClassProvider, Type } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core/src/di';
import { environment as env } from '../environments/environment';
import { WebapiInterceptor } from './webapi.interceptor';
import { IWebapiInterface } from './webapi.interface';
import { WebapiService } from './webapi.service';
import { MockWebapiService } from './mock-webapi.service';

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
    // providers.push(WebapiService);
    providers.push({ provide: WebapiService, useClass: MockWebapiService });
}

@NgModule({
    imports: [HttpClientModule],
    providers: providers
})
export class WebapiModule {
}