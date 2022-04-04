export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._container = containerSelector;
        this._renderer = renderer;
    }

    addAppendItem(element) {
        this._container.append(element);
    }

    addPrependItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        })
    }
}