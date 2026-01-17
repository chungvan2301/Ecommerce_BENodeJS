class CreateProductDTO {
    constructor(payload) {
        this.title = payload.title;
        this.description = payload.description;
        this.price = payload.price;
        this.category = payload.category;
        this.brand = payload.brand;
        this.quantity = payload.quantity;
        this.image = payload.image;
    }
}

class ProductResponseDTO {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.slug = product.slug;
        this.price = product.price;
        this.category = product.category;
        this.brand = product.brand;
        this.quantity = product.quantity;
        this.image = product.image;
        this.createdAt = product.createdAt;
    }
}

module.exports = {
    CreateProductDTO,
    ProductResponseDTO
};
