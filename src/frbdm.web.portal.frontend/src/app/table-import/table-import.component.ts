import { Component, OnInit } from "@angular/core";
import { environment as env } from '../../environments/environment';
import { AuthorizationService } from "../authorization.service";
import { BlockUIService } from "ng-block-ui";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-table-import',
    templateUrl: 'table-import.component.html',
    styleUrls: ['table-import.component.less']
})
export class TableImportComponent implements OnInit {
    actionUrl: string;
    file: any;
    progress: number;
    lastState: any;

    constructor(
        private auth: AuthorizationService,
        private blockUI: BlockUIService,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        this.auth.authorize('系統管理員');
        document.title = '譯碼簿匯入 - FRBDM';
        this.actionUrl = `${env.apiBaseUrl}/import-datatables`;
        this.getProgress();
    }

    submit() {
        console.log(this.file);
        this.blockUI.start('block-ui-main', '檔案處理中 ...');
        const form = document.getElementById('uploadForm') as any
        form.submit();
    }

    private getProgress() {
        this.http.get(`${env.apiBaseUrl}/get-import-progress`).subscribe(progress => {
            if (progress == null || progress == 100) {
                this.progress = null;
                this.getLastState();
            } else {
                this.progress = progress as number;
                setTimeout(() => {
                    this.getProgress();
                }, 500);
            }
        });
    }

    private getLastState() {
        this.http.get(`${env.apiBaseUrl}/get-last-import-state`).subscribe(state => {
            this.lastState = state;
        });
    }
}
