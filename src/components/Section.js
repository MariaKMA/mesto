export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._container = containerSelector;
        this._renderer = renderer;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }
}