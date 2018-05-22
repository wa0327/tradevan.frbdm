import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, Input, OnInit, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-table-search',
    templateUrl: 'table-search.component.html',
    styleUrls: ['table-search.component.less']
})
export class TableSearchComponent implements OnInit {

    databases: DatabaseItem[]

    @Input() db: DatabaseItem;
    @Input() term: string;
    @Input() forTable: boolean;
    @Input() forColumn: boolean;
    @Input() dataDate: string;

    lastQueryArgs: SearchArgs;
    result: PageData;

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.reset();
        console.log('before');
        this.http.get<DatabaseItem[]>('/api/databases').subscribe(databases => {
            console.log('before2');
            this.databases = databases;
            console.log('after2');
        });
    }

    search() {
        var args = this.getQueryArgs();

        if (args.db == null && args.term == null) {
            alert('[資料庫]與[查詢名稱]至少要選擇一項。');
            return;
        }

        if (args.term) {
            if (!args.for_table && !args.for_column) {
                alert('[資料表名稱]與[欄位名稱]至少要選擇一項。');
                return;
            }
        }

        this.getPage(args, 0).subscribe(result => {
            this.result = result;
        });
        this.lastQueryArgs = args;
    }

    reset() {
        this.db = null;
        this.term = null;
        this.forTable = true;
        this.forColumn = false;
        this.dataDate = null;
    }

    page(pageIndex: number) {
        if (this.result.page == pageIndex) {
            return;
        }

        this.getPage(this.lastQueryArgs, pageIndex).subscribe(result => {
            this.result = result;
        });
    }

    open_detail(dbId: string, tableId: string) {
        var param = {
            term: this.lastQueryArgs.term,
            db: dbId,
            tb: tableId
        };

        var url = `index.aspx/#/table-detail/${dbId}/${tableId}`;
        if (this.lastQueryArgs.term) {
            url = `${url}/${this.lastQueryArgs.term}`;
        }

        window.open(url, '_blank');
    }

    highlight(text: string) {
        var term = this.term;
        if (text && term)
            return this.sanitizer.bypassSecurityTrustHtml(text.replace(new RegExp(term, 'gi'), '<highlight>$&</highlight>'));
        else
            return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    private getQueryArgs(): SearchArgs {
        var args = new SearchArgs();

        if (this.db) {
            args.db = this.db.id;
        }

        if (this.term) {
            args.term = this.term;

            if (this.forTable) {
                args.for_table = this.forTable;
            }

            if (this.forColumn) {
                args.for_column = this.forColumn;
            }
        }

        if (this.dataDate) {
            args.data_date = this.dataDate;
        }

        return args;
    }

    private getPage(args: SearchArgs, pageIndex: number): Observable<PageData> {
        const pageSize = 10;
        args.page_size = pageSize;
        args.page_index = pageIndex;

        var url = '/api/datatables?' + $.param(args);

        return this.http.get<SearchResult>(url).pipe(map(data => {
            var pageArray = [];
            for (var i = Math.max(0, pageIndex - 3); i < pageIndex; i++) {
                pageArray.push(i);
            }
            pageArray.push(i);
            var pageMax = Math.floor(data.total / pageSize);
            for (var i = pageIndex + 1; i <= Math.min(pageMax, pageIndex + 3); i++) {
                pageArray.push(i);
            }

            return {
                total: data.total,
                rows: data.rows,
                page: pageIndex,
                pageMax: pageMax,
                pages: pageArray
            };
        }));
    }
}

class DatabaseItem {
    id: string;
    src: string;
    name: string;
}

class TableItem {
    id: string;
    db: DatabaseItem;
    name: string;
    nameE?: string;
    dataDate?: string;
}

class SearchArgs {
    page_size: number;
    page_index: number;
    db: string;
    term: string;
    for_table: boolean;
    for_column: boolean;
    data_date: string;
}

class SearchResult {
    total: number;
    rows: TableItem[]
}

class PageData {
    total: number;
    rows: TableItem[];
    page?: number;
    pageMax?: number;
    pages: number[];
}