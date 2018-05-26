import { Observable } from 'rxjs';
import { DatabaseItem, TableSearchArgs, TableSearchResult, TableDetailItem } from './entities';

export abstract class WebapiService {
    abstract getDatabases(): Observable<DatabaseItem[]>;
    abstract searchDataTables(args: TableSearchArgs): Observable<TableSearchResult>;
    abstract getDataTable(dbId: string, tableId: string): Observable<TableDetailItem>;
}