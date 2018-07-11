import { environment as env } from '../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from "../authorization.service";
import { BlockUIService } from "ng-block-ui";

@Component({
    selector: 'app-table-import',
    templateUrl: 'table-import.component.html',
    styleUrls: ['table-import.component.less']
})
export class TableImportComponent implements OnInit {
    actionUrl: string;
    file: any;
    progress: number;
    lastFileName: string;
    lastState: any;
    lastError: string;
    exceptions: any[];

    constructor(
        private auth: AuthorizationService,
        private blockUI: BlockUIService,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        document.title = '譯碼簿匯入 - FRBDM';
        this.actionUrl = `${env.apiBaseUrl}/import-datatables`;
        this.auth.authorize('系統管理員').subscribe(() => {
            this.getProgress();
        });
    }

    submit() {
        if (this.file == null) {
            alert('請先選擇檔案！');
            return;
        }

        if (!/.xlsx$/i.test(this.file)) {
            alert('副檔名必需為 xlsx！');
            return;
        }

        this.progress = null;
        this.exceptions = null;
        this.lastState = null;
        this.blockUI.start('block-ui-main', '正在上傳檔案 ...');
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
                }, 2500);
            }
        });
    }

    private getLastState() {
        this.http.get<any>(`${env.apiBaseUrl}/get-last-import-state`).subscribe(data => {
            if (data) {
                this.lastFileName = data.fileName;
                if (data.succeed) {
                    this.lastState = data.state;
                } else if (data.error) {
                    this.lastError = data.error;
                } else if (data.exception) {
                    this.exceptions = [];
                    var ex = data.exception;
                    while (ex) {
                        this.exceptions.push(ex);
                        ex = ex.inner;
                    }
                }
            }
        });
    }
}
