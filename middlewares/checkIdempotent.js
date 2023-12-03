const { getIdempotencyKey } = require("../utils/idempotencyKey");
const { WRITE_METHODS } = require("./constants");

class IdempotentMiddleware {
    #redisClient;
    constructor(redisClient) {
        this.#redisClient = redisClient;
    }
    async check(req, res, next) {
        if (!WRITE_METHODS.find(method => req.method === method)) {
            return next();
        }

        if (!req.headers['x-idempotent-header']) {
            res.json(400, {
                message: 'request must contain x-idempotent-header'
            });
            return;
        }

        const idempotencyKey = getIdempotencyKey(req.headers['x-idempotent-header']);
        const request = await this.#redisClient.get(idempotencyKey);
        if (request) {
            res.json(JSON.parse(request));
            return;
        }
        next();
    }
}

module.exports = IdempotentMiddleware;