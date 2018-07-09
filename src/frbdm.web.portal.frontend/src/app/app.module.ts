import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { WebapiModule } from '../webapi/webapi.module';
import { AppComponent } from './app.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AuthorizationService } from './authorization.service';

const routes: Routes = [
    { path: '', redirectTo: '/tables', pathMatch: 'full' },
    { path: 'tables', component: TableSearchComponent },
    { path: 'tables/:dbId/:tableId', component: TableDetailComponent },
    { path: 'tables/:dbId/:tableId/:term', component: TableDetailComponent },
    { path: 'users', component: UserSearchComponent },
    { path: 'users/:userId', component: UserEditComponent },
    { path: 'add-user', component: UserEditComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        TableSearchComponent,
        TableDetailComponent,
        UserSearchComponent,
        UserEditComponent
    ],
    providers: [AuthorizationService],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        WebapiModule,
        // BlockUIModule.forRoot(),
        // BlockUIHttpModule.forRoot()
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
