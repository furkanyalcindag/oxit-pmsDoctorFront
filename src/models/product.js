export default class Product {
    constructor(name, barcode_number, uuid, quantity, netPrice, isOpen, totalProduct, taxRate, categories, productImages, shelf) {
        this.name = name;
        this.barcode_number = barcode_number;
        this.uuid = uuid
        this.quantity = quantity
        this.isOpen = isOpen
        this.taxRate = taxRate
        this.netPrice = netPrice
        this.totalProduct = totalProduct
        this.categories = categories
        this.productImages = productImages
        this.shelf = shelf

    }
}


