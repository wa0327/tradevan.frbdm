import { environment as env } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebapiService } from './webapi.service';
import { CurrentLogon, DatabaseItem, TableSearchArgs, TableSearchResult, TableDetailItem, UserSearchResult, UserItem } from './entities';

@Injectable()
export class ImplWebapiService implements WebapiService {
    private readonly baseUrl = env.apiBaseUrl;

    constructor(private http: HttpClient) {
        env.apiInit.call(env, http);
    }

    getLogon() {
        return this.http.get<CurrentLogon>(`${this.baseUrl}/logon/current`);
    }

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

    searchUsers(account: string, name: string) {
        const args = {
            account,
            name
        };
        const url = `${this.baseUrl}/users?${$.param(args)}`
        return this.http.get<UserSearchResult>(url);
    }

    getUser(userId: number) {
        const url = `${this.baseUrl}/users/${userId}`;
        return this.http.get<UserItem>(url);
    }

    saveUser(user: UserItem) {
        return this.http.post<void>(`${this.baseUrl}/user`, user);
    }
}