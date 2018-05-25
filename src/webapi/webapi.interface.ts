import { Observable } from 'rxjs';
import { DatabaseItem, TableSearchArgs, TableSearchResult, TableDetailItem } from './entities';

export interface IWebapiInterface {
    getDatabases(): Observable<DatabaseItem[]>;
    searchDataTables(args: TableSearchArgs): Observable<TableSearchResult>;
    getDataTable(dbId: string, tableId: string): Observable<TableDetailItem>;
}