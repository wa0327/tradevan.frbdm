import { Component, Input, OnInit, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-table-detail',
    templateUrl: 'table-detail.component.html',
    styleUrls: ['table-detail.component.less']
})
export class TableDetailComponent implements OnInit {
 
    params: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.getTable();
    }

    private getTable() {
        const params = this.params = this.route.snapshot.params;
        const dbId = params['dbId'];
        const tableId = params['tableId'];
        const term = params['term'];
    }
}
