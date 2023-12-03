const redis = require('redis');
const { errorStrings, logStrings } = require('./constants');

class RedisClient {
    #client;
    constructor(url) {
        this.#client = redis.createClient({url: url});
    }
    async connect() {
        try {
            await this.#client.connect();
            console.log('Redis connected');
        } catch (err) {
            console.error(errorStrings('connect'), err);
        }
    }
    async get(key) {
        try {
            logStrings('get', { key });
            return await this.#client.get(key);
        } catch (err) {
            console.error(errorStrings('get', err));
        }
    }
    async set(key, value, expiry) {
        try {
            logStrings('set', { key, value, expiry })
            if (expiry) {
                await this.#client.setEx(key, expiry, value);
                return;
            }
            this.#client.set(key, value);
        } catch (err) {
            console.error(errorStrings('set', err));
        }
    }

    async addToList(key, value) {
        try {
            this.#client.rPush(key, value);
        } catch (err) {
            console.error(errorStrings('rpush', err));
        }
    }
}

module.exports = RedisClient;