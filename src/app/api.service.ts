import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
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

export class DatabaseItem {
    id: string;
    src: string;
    name: string;
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
    rows: {
        id: string;
        db: {
            id: string;
            src: string;
            name: string;
        };
        name: string;
        nameE?: string;
        dataDate?: string;
    }[]
}

export class TableDetailItem {
    db: {
        src: string;
        name: string;
        dept: string;
        admin: string;
        principal: string;
    };
    name: string;
    nameE?: string;
    remark: string;
    important: string;
    dataDate: string;
    cols: {
        id: string;
        name: string;
        nameE: string,
        isPK: boolean;
        nullable: boolean;
        type: string;
        length: string;
        alias: string;
        remark: string;
        codeMap: {
            code: string;
            name: string;
        }[]
    }[];
}