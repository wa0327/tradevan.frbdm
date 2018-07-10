import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-table-import-result-item',
    templateUrl: 'table-import-result-item.component.html',
    styleUrls: ['table-import-result-item.component.less']
})
export class TableImportResultItemComponent implements OnInit {
    @Input() state: any;
    @Input() name: string;

    total: number;
    succeed: number;
    failed: number;
    failures: any;

    ngOnInit() {
        this.total = this.state[this.name].total;
        this.succeed = this.state[this.name].succeed;
        this.failed = this.total - this.succeed;
        this.failures = this.state[this.name].failures;
    }
}