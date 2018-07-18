import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseItem, TableSearchArgs, TableSearchResult } from '../entities';

@Component({
    selector: 'app-table-search',
    templateUrl: 'table-search.component.html',
    styleUrls: ['table-search.component.less']
})
export class TableSearchComponent implements OnInit {

    databases: DatabaseItem[]
    db: DatabaseItem;
    term: string;
    forTable: boolean;
    forColumn: boolean;
    dataDate: string;
    lastQueryArgs: TableSearchArgs;
    result: PageData;

    constructor(
        private sanitizer: DomSanitizer,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        document.title = '譯碼簿查詢 - FRBDM';
        this.reset();
        this.http.get<DatabaseItem[]>(`${env.apiBaseUrl}/databases`).subscribe(databases => {
            this.databases = databases;
            if (!env.production) {
                this.db = databases[0];
                this.term = '產品';

                if (env.useMockData) {
                    this.search();
                }
            }
        });
    }

    search() {
        var args = this.getQueryArgs();
        if (args) {
            this.getPage(args, 0).subscribe(result => {
                this.result = result;
                this.animateCards();
            });
            this.lastQueryArgs = args;
        }
    }

    export() {
        var args = this.getQueryArgs();
        if (args) {
            const url = `${env.apiBaseUrl}/datatables/export?${$.param(args)}`;
            window.open(url, '_blank');
        }
    }

    reset() {
        this.db = null;
        this.term = null;
        this.forTable = true;
        this.forColumn = true;
        this.dataDate = null;
    }

    page(pageIndex: number) {
        if (this.result.page == pageIndex
            || pageIndex < 0
            || pageIndex > this.result.pageMax) {
            return;
        }

        this.getPage(this.lastQueryArgs, pageIndex).subscribe(result => {
            this.result = result;
            this.animateCards();
        });
    }

    open_detail(dbId: string, tableId: string) {
        var url = `/#/tables/${dbId}/${tableId}`;
        if (this.lastQueryArgs.term) {
            url = `${url}/${this.lastQueryArgs.term}`;
        }

        window.open(url, '_blank');
    }

    highlight(text: string) {
        var term = this.lastQueryArgs.term;
        var forTable = this.lastQueryArgs.for_table;
        if (text && term && forTable)
            return this.sanitizer.bypassSecurityTrustHtml(text.replace(new RegExp(term, 'gi'), '<highlight>$&</highlight>'));
        else
            return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    private getQueryArgs(): TableSearchArgs {
        var args = new TableSearchArgs();

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

        if (args.db == null && args.term == null) {
            alert('[資料庫]與[查詢名稱]至少要選擇一項。');
            return null;
        }

        if (args.term) {
            if (!args.for_table && !args.for_column) {
                alert('[資料表名稱]與[欄位名稱]至少要選擇一項。');
                return null;
            }
        }

        return args;
    }

    private getPage(args: TableSearchArgs, pageIndex: number): Observable<PageData> {
        const pageSize = 12;
        args.page_size = pageSize;
        args.page_index = pageIndex;

        return this.http.get<TableSearchResult>(`${env.apiBaseUrl}/datatables?${$.param(args)}`).pipe(map(data => {
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

    private animateCards() {
        setTimeout(() => {
            const cards = $('div.card').toArray().reverse();
            if (cards.length > 0) {
                const timer = setInterval(() => {
                    const card = cards.pop()
                    card.classList.add('show')
                    if (cards.length == 0) {
                        clearInterval(timer)
                    }
                }, 30);
            }
        });
    }
}

class PageData {
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
    }[];
    page?: number;
    pageMax?: number;
    pages: number[];
}