import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWebapiInterface } from './webapi.interface';
import { DatabaseItem, TableSearchArgs, TableSearchResult, TableDetailItem } from './entities';

@Injectable()
export class WebapiService implements IWebapiInterface {
    private readonly baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getDatabases() {
        const url = `${this.baseUrl}/databases`;
        return this.http.get<DatabaseItem[]>(url);
    }

    searchDataTables(args: TableSearchArgs) {
        const url = `${this.baseUrl}/datatables?${$.param(args)}`
        return this.http.get<TableSearchResult>(url);
    }

    getDataTable(dbId: string, tableId: string) {
        const url = `${this.baseUrl}/databases/${dbId}/datatables/${tableId}`;
        return this.http.get<TableDetailItem>(url);
    }
}