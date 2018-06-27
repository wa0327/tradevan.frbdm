export class DatabaseItem {
    id: string;
    src: string;
    name: string;
}

export class TableSearchArgs {
    page_size: number;
    page_index: number;
    db: string;
    term: string;
    for_table: boolean;
    for_column: boolean;
    data_date: string;
}

export class TableSearchResult {
    total: number;
    rows: {
        id: string;
        db: DatabaseItem;
        name: string;
        nameE?: string;
        dataDate?: string;
    }[]
}

export class TableDetailItem {
    db: {
        src: string;
        name: string;
        dept: string;
        admin: string;
        principal: string;
    };
    name: string;
    nameE?: string;
    remark: string;
    important: string;
    dataDate: string;
    cols: {
        id: string;
        name: string;
        nameE: string,
        isPK: boolean;
        nullable: boolean;
        type: string;
        length: string;
        alias: string;
        remark: string;
        codeMap: {
            code: string;
            name: string;
        }[]
    }[];
}