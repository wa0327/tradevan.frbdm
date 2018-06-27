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

const routes: Routes = [
    { path: '', redirectTo: '/table-search', pathMatch: 'full' },
    { path: 'table-search', component: TableSearchComponent },
    { path: 'table-detail/:dbId/:tableId', component: TableDetailComponent },
    { path: 'table-detail/:dbId/:tableId/:term', component: TableDetailComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        TableSearchComponent,
        TableDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        WebapiModule,
        BlockUIModule.forRoot(),
        BlockUIHttpModule.forRoot()
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
