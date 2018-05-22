import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { ApiInterceptor } from './api.interceptor';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { TableDetailComponent } from './table-detail/table-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/table-search', pathMatch: 'full' },
    { path: 'table-search', component: TableSearchComponent },
    { path: 'table-detail/:dbId/:tableId', component: TableDetailComponent },
    { path: 'table-detail/:dbId/:tableId/:term', component: TableDetailComponent }
];

const httpInterceptorProviders = [{
    provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true
}];

@NgModule({
    declarations: [AppComponent, TableSearchComponent, TableDetailComponent],
    providers: [httpInterceptorProviders, ApiService],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BlockUIModule.forRoot(),
        BlockUIHttpModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true })
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
