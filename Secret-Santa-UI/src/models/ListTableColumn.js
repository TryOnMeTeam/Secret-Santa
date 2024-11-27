export class ListTableColumn {
    constructor(key, label, minWidth, align = 'left', format = null) {
        this.key = key;
        this.label = label;
        this.minWidth = minWidth || 100;
        this.align = align;
        this.format = format;
    }
}