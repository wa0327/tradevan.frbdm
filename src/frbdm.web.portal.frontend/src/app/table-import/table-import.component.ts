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

    cancelled: boolean;
    progress: number;
    fileName: string;
    state: any;
    error: string;
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
            // this.progress = 88;
        });
    }

    import() {
        if (this.file == null) {
            alert('請先選擇檔案！');
            return;
        }

        if (!/.xlsx$/i.test(this.file)) {
            alert('副檔名必需為 xlsx！');
            return;
        }

        this.cancelled = null;
        this.progress = null;
        this.exceptions = null;
        this.state = null;
        this.blockUI.start('block-ui-main', '正在上傳檔案 ...');
        const form = document.getElementById('uploadForm') as any
        form.submit();
    }

    cancel(btn: HTMLElement) {
        btn.innerText = '取消中...';
        btn.setAttribute('disabled', '');
        console.log(btn);
        this.http.get(`${env.apiBaseUrl}/cancel-import-datatables`).subscribe(() => {
        });
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
        this.http.get<any>(`${env.apiBaseUrl}/get-import-state`).subscribe(data => {
            if (data) {
                this.fileName = data.fileName;
                if (data.cancelled) {
                    this.cancelled = true;
                } else if (data.succeed) {
                    this.state = data.state;
                } else if (data.error) {
                    this.error = data.error;
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
