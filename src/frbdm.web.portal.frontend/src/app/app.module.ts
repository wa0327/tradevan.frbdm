import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { AppComponent } from './app.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AuthorizationService } from './authorization.service';
import { TableImportComponent } from './table-import/table-import.component';
import { TableImportResultItemComponent } from './table-import/table-import-result-item.component';
import { MyHttpInterceptor } from './http.interceptor';

const routes: Routes = [
    { path: '', redirectTo: '/tables', pathMatch: 'full' },
    { path: 'tables', component: TableSearchComponent },
    { path: 'tables/:dbId/:tableId', component: TableDetailComponent },
    { path: 'tables/:dbId/:tableId/:term', component: TableDetailComponent },
    { path: 'import-tables', component: TableImportComponent },
    { path: 'users', component: UserSearchComponent },
    { path: 'users/:userId', component: UserEditComponent },
    { path: 'add-user', component: UserEditComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        TableSearchComponent,
        TableDetailComponent,
        TableImportComponent,
        TableImportResultItemComponent,
        UserSearchComponent,
        UserEditComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
        AuthorizationService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        HttpClientModule,
        BlockUIModule.forRoot({delayStart: 0}),
        // BlockUIHttpModule.forRoot()
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
