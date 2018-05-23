import { Component, Input, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService, TableDetailItem } from '../api.service';

import * as $ from 'jquery';

@Component({
    selector: 'app-table-detail',
    templateUrl: 'table-detail.component.html',
    styleUrls: ['table-detail.component.less']
})
export class TableDetailComponent implements OnInit {

    private dbId: string;
    private tableId: string;
    private term: string;
    private last_codemapButton: HTMLElement;

    dt: TableDetailItem;

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private api: ApiService) { }

    ngOnInit() {
        const q = this.route.snapshot.params;
        this.dbId = q['dbId'];
        this.tableId = q['tableId'];
        this.term = q['term'];
        this.api.getDataTable(this.dbId, this.tableId).subscribe(dt=>{
            this.dt = dt;
        });
    }

    highlight(text: string) {
        var term = this.term;
        if (text && term)
            return this.sanitizer.bypassSecurityTrustHtml(text.replace(new RegExp(term, 'gi'), '<highlight>$&</highlight>'));
        else
            return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    codemapButton_click(btn: HTMLElement) {
        if (this.last_codemapButton && btn != this.last_codemapButton) {
            $(this.last_codemapButton).popover('hide');
        }
        this.last_codemapButton = btn;
    }
}
