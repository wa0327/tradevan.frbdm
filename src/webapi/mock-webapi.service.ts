import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IWebapiInterface } from './webapi.interface';
import { DatabaseItem, TableSearchArgs, TableSearchResult, TableDetailItem } from './entities';

@Injectable()
export class MockWebapiService implements IWebapiInterface {
    getDatabases(): Observable<DatabaseItem[]> {
        return of([{
            'id': 'DB001',
            'src': '食藥署',
            'name': '食品追溯追蹤管理資訊系統(非追不可)'
        }, {
            'id': 'DB002',
            'src': '食藥署',
            'name': '食品業者登錄平台(非登不可)'
        }, {
            'id': 'DB003',
            'src': '食藥署',
            'name': '產品通路管理資訊系統(非稽不可)'
        }, {
            'id': 'DB004',
            'src': '食藥署',
            'name': '檢驗管理系統(非驗不可)'
        }, {
            'id': 'DB005',
            'src': '食藥署',
            'name': '輸入食品邊境查驗管理資訊系統(非報不可)'
        }, {
            'id': 'DB006',
            'src': '財政部',
            'name': '關港貿單一窗口'
        }, {
            'id': 'DB007',
            'src': '經濟部',
            'name': '一般工業用油脂工廠申報資料'
        }, {
            'id': 'DB008',
            'src': '經濟部',
            'name': '工商登記資料庫'
        }, {
            'id': 'DB009',
            'src': '經濟部',
            'name': '生產選定化學物質工廠申報系統'
        }, {
            'id': 'DB010',
            'src': '經濟部',
            'name': '進口工業用油脂申報資料'
        }, {
            'id': 'DB011',
            'src': '經濟部',
            'name': '國貿局-油脂流向'
        }, {
            'id': 'DB012',
            'src': '化學局',
            'name': '事業廢棄物申報及管理資訊系統'
        }, {
            'id': 'DB013',
            'src': '化學局',
            'name': '毒性化學物質登記申報系統'
        }, {
            'id': 'DB014',
            'src': '農委會',
            'name': '飼料管理系統'
        }]);
    }

    searchDataTables(args: TableSearchArgs): Observable<TableSearchResult> {
        return of({
            'total': 148,
            'rows': [{
                'id': 'T001',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': 'APIKey限制IP明細檔',
                'nameE': 'ApiKeyDetail',
                'dataDate': null
            }, {
                'id': 'T002',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': 'APIKey授權檔',
                'nameE': 'ApiKeyAuth',
                'dataDate': null
            }, {
                'id': 'T003',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': 'APIKey對應Token明細檔',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T004',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': 'IFI產品同步資訊主檔',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T005',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': 'IFI產品同步資訊整理',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T006',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': 'IFI業者基本資料檔',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T007',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': '工廠基本資料檔',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T008',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': '平台網址檔',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T009',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': '平台瀏覽人次紀錄檔',
                'nameE': null,
                'dataDate': null
            }, {
                'id': 'T010',
                'db': {
                    'id': 'DB001',
                    'src': '食藥署',
                    'name': '食品追溯追蹤管理資訊系統(非追不可)'
                },
                'name': '交易對象主檔',
                'nameE': null,
                'dataDate': null
            }]
        });
    }

    getDataTable(dbId: string, tableId: string): Observable<TableDetailItem> {
        return of({
            'db': {
                'src': '食藥署',
                'name': '食品追溯追蹤管理資訊系統(非追不可)',
                'dept': '食品組',
                'admin': '許攸如',
                'principal': '曾靜宜'
            },
            'name': 'IFI產品同步資訊主檔',
            'nameE': null,
            'remark': null,
            'important': null,
            'dataDate': null,
            'cols': [{
                'id': 'C001',
                'name': '業者統一編號',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '50        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C002',
                'name': '業者名稱',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '600       ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C003',
                'name': '產品登錄碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '30        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C004',
                'name': '簽審文件編號',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '14        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C005',
                'name': '報單號碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '30        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C006',
                'name': '進口日期',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'date                ',
                'length': '10        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C007',
                'name': '輸入許可通知號碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '20        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C008',
                'name': '報單項次',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'int                 ',
                'length': '(10, 0)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C009',
                'name': '貨品分類號列',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '20        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C010',
                'name': '產品中文名稱',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '400       ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C011',
                'name': '產品英文名稱',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '400       ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C012',
                'name': '放行日期',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'date                ',
                'length': '10        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C013',
                'name': '核銷紀錄的介面異動日期',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'datetime            ',
                'length': '(23, 3)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C014',
                'name': '轉入依據',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'int                 ',
                'length': '(10, 0)   ',
                'alias': null,
                'remark': '1.貨品分類號列  2.添加物產品登錄碼 3.查驗登記許可證',
                'codeMap': [{
                    'code': '0',
                    'name': 'Unknown'
                }, {
                    'code': '1',
                    'name': '待轉入'
                }, {
                    'code': '11',
                    'name': '已轉入'
                }, {
                    'code': '13',
                    'name': '已更新'
                }, {
                    'code': '2',
                    'name': '轉入失敗'
                }, {
                    'code': '3',
                    'name': '待更新(批號、成分)'
                }, {
                    'code': '4',
                    'name': '更新失敗'
                }]
            }, {
                'id': 'C015',
                'name': '查驗登記分類名稱',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '50        ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C016',
                'name': '同步結果',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'int                 ',
                'length': '(10, 0)   ',
                'alias': null,
                'remark': null,
                'codeMap': [{
                    'code': '0',
                    'name': 'Unknown'
                }, {
                    'code': '1',
                    'name': '待轉入'
                }, {
                    'code': '11',
                    'name': '已轉入'
                }, {
                    'code': '13',
                    'name': '已更新'
                }, {
                    'code': '2',
                    'name': '轉入失敗'
                }, {
                    'code': '3',
                    'name': '待更新(批號、成分)'
                }, {
                    'code': '4',
                    'name': '更新失敗'
                }]
            }, {
                'id': 'C017',
                'name': '產品資訊主檔關聯碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'int                 ',
                'length': '(10, 0)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C018',
                'name': '程式例外資訊主檔關聯碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'int                 ',
                'length': '(10, 0)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C019',
                'name': '建檔時間',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'datetime            ',
                'length': '(23, 3)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C020',
                'name': '最後異動時間',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'datetime            ',
                'length': '(23, 3)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C021',
                'name': 'IFI產品同步資訊主檔識別碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'int                 ',
                'length': '(10, 0)   ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C022',
                'name': '製造廠代碼',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '500       ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }, {
                'id': 'C023',
                'name': '生產國別',
                'nameE': null,
                'isPK': false,
                'nullable': true,
                'type': 'nvarchar            ',
                'length': '200       ',
                'alias': null,
                'remark': null,
                'codeMap': []
            }]
        });
    }
}