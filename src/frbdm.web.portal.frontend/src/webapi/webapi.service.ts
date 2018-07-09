import { Observable } from 'rxjs';
import { CurrentLogon, DatabaseItem, TableSearchArgs, TableSearchResult, TableDetailItem, UserSearchResult, UserItem } from './entities';

export abstract class WebapiService {
    abstract getLogon(): Observable<CurrentLogon>;
    abstract getDatabases(): Observable<DatabaseItem[]>;
    abstract searchDataTables(args: TableSearchArgs): Observable<TableSearchResult>;
    abstract getDataTable(dbId: string, tableId: string): Observable<TableDetailItem>;
    abstract searchUsers(account: string, name: string): Observable<UserSearchResult>;
    abstract getUser(userId: number): Observable<UserItem>;
    abstract saveUser(user: UserItem): Observable<void>;
}