

// for {
//   addItem(c)
// }

// export default class Section2 {
//     constructor({renderer}, containerSelector) {
//         this._renderedItems = [];
//         this._container = containerSelector;
//         this._renderer = renderer;
//     }

//     deleteItem(item) {
//         ri = this._renderedItems.filter(ri => ri.item === item);
//         this._renderedItems.pop(item);
//         this._container.remove(ri.elem);
//     }

//     addItem(item) {
//         let elem = this._renderer(item);
//         this._renderedItems.push({
//             item: item,
//             elem: elem
//         });
//         this._container.prepend(elem);
//     }
// }























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