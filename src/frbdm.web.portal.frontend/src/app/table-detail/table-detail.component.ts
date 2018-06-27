import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { WebapiService } from '../../webapi/webapi.service';
import { TableDetailItem } from '../../webapi/entities';

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
        private api: WebapiService) { }

    ngOnInit() {
        document.title = '資料表明細 - FRBDM';
        const q = this.route.snapshot.params;
        this.dbId = q['dbId'];
        this.tableId = q['tableId'];
        this.term = q['term'];
        this.api.getDataTable(this.dbId, this.tableId).subscribe(dt => {
            this.dt = dt;

            setTimeout(() => {
                for (const e of this.codemaps.toArray()) {
                    const $e = $(e.nativeElement);
                    const $btn = $e.find('.codemap-btn');
                    const $content = $e.find('.codemap-content');
                    $content.find('button').on('click', () => {
                        this.hidePopover($btn);
                    });
                    $content.detach();
                    $btn.popover({
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title text-center"></h3><div class="popover-content"></div></div>',
                        title: '代碼表',
                        content: $content[0],
                        html: true,
                        placement: function () {
                            if (screen.width < 768)
                                return 'left';
                            else
                                return 'right';
                        }
                    });
                    $content.show();
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
        if (this.last_codemapButton) {
            if (btn === this.last_codemapButton) {
                return;
            }

            this.hidePopover(this.last_codemapButton);
        }

        this.last_codemapButton = btn;
    }

    private hidePopover(btn: JQuery<HTMLElement> | HTMLElement) {
        var $btn: JQuery<HTMLElement>;

        if (btn instanceof HTMLElement) {
            $btn = $(btn);
        } else {
            $btn = btn;
        }

        $btn.popover('hide');
        $btn.data('bs.popover').inState['click'] = false; //修正 bs3 bug，因為調用 hide 方法時，它不會將狀態設為 false。
    }
}
