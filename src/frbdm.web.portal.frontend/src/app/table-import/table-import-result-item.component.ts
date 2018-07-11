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
    ignored: number;
    succeed: number;
    failed: number;
    failures: any;

    ngOnInit() {
        if (this.state[this.name]) {
            this.total = this.state[this.name].total;
            this.ignored = this.state[this.name].ignored.length;
            this.succeed = this.state[this.name].succeed.length;
            this.failed = this.total - this.ignored - this.succeed;
            this.failures = this.state[this.name].failures;
        }
    }
}