import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    private baseUrl = 'http://tradevan:8080/api';

    constructor(private http: HttpClient) { }

    getDatabases() {
        const url = `${this.baseUrl}/databases`;
        return this.http.get<DatabaseItem[]>(url);
    }

    searchDataTables(args: TableSearchArgs) {
        const url = `${this.baseUrl}/datatables?${$.param(args)}`
        return this.http.get<TableSearchResult>(url);
    }
}

export class DatabaseItem {
    id: string;
    src: string;
    name: string;
}

export class TableItem {
    id: string;
    db: DatabaseItem;
    name: string;
    nameE?: string;
    dataDate?: string;
}

export class TableSearchArgs {
    page_size: number;
    page_index: number;
    db: string;
    term: string;
    for_table: boolean;
    for_column: boolean;
    data_date: string;
}

export class TableSearchResult {
    total: number;
    rows: TableItem[]
}
