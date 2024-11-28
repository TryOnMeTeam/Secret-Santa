export class ListTableColumn {
    constructor(key, label, minWidth, align = 'left', format = null, isLink = false) {
        this.key = key;
        this.label = label;
        this.minWidth = minWidth || 100;
        this.align = align;
        this.format = format;
        this.isLink = isLink;
    }
}