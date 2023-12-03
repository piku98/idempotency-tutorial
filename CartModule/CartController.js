const { getIdempotencyKey } = require("../utils/idempotencyKey");

// sample controller, the logic should always be inside a service file unlike this one.
class CartController {
    #db;
    constructor(redisClient) {
        this.#db = redisClient;
    }
    async addToCart(req, res) {
        try {
            /**
             * if item is present in the cart then increase the count else, set it to one.
             */
            const itemId = req.body.item_id;
            const item = await this.#db.get(req.body.item_id);
            let itemCount = item ? parseInt(item) : 1;

            await this.#db.set(itemId, (++itemCount).toString());

            const response = {
                item_id: itemId,
                count: itemCount
            };

            /**
             *  set the response value to cache.
             *  So that the middleware can send the same response value to the client if the idempotent key is same.
             */
            const idempotencyKey = getIdempotencyKey(req.headers['x-idempotent-header']);
            await this.#db.set(idempotencyKey, JSON.stringify(response));

            res.json(response);

        } catch (err) {
            console.error(`Example POST error:`, err);
        }
    }

    async getCartItemInfo(req, res) {
        try {
            const itemId = req.query.item_id;
            const itemCount = await this.#db.get(itemId);
            res.json({
                item_id: itemId,
                count: itemCount
            });
        } catch (err) {
            console.error(`Example GET error:`, err);
        }
    }
    
}

module.exports = CartController;