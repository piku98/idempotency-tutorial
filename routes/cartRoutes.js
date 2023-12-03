const express = require('express');

class CartRouter {
    #cartController;
    #router;
    constructor(cartController) {
        this.#cartController = cartController;
        this.#router = express.Router()
        this.initRoutes();
    }

    initRoutes() {
        this.#router.post('/addToCart', this.#cartController.addToCart.bind(this.#cartController));
        this.#router.get('/getCartItemInfo', this.#cartController.getCartItemInfo.bind(this.#cartController));
    }

    getRouter() {
        return this.#router;
    }
}

module.exports = CartRouter;