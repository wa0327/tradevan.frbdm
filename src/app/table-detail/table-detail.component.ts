import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService, TableDetailItem } from '../api.service';

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
    @ViewChildren('codemap') codemaps: QueryList<ElementRef>;

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

            setTimeout(()=>{
                for (const e of this.codemaps.toArray()) {
                    console.log(e);
                    const $e = $(e.nativeElement);
                    const $btn = $e.find('button.codemap');
                    const $table = $e.find('div.codemap-popover');
                    $table.find('button.close').on('click', ()=>{
                        $btn.popover('hide');
                    });
                    $table.detach();
                    $btn.popover({
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body px-1 py-1"></div></div>',
                        html: true,
                        content: $table[0]
                    });
                    $table.show();
                }
            }, 1);
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
