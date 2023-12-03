// this can be made better by hashing the whole key
module.exports.getIdempotencyKey = (key) => `x-idempotent-${key}`;