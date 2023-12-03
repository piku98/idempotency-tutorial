const express = require('express');
const bodyParser = require('body-parser');
const IdempotentMiddleware = require('./middlewares/checkIdempotent');
const RedisClient = require('./redis/redisClient');
const CartController = require('./CartModule/CartController');
const CartRouter = require('./routes/cartRoutes');

const app = express();

const redisClient = new RedisClient(process.env.REDIS_URL);
redisClient.connect()

const checkIdempotent = new IdempotentMiddleware(redisClient);
const cartController = new CartController(redisClient);
const cartRouter = new CartRouter(cartController);

app.use(bodyParser.json());
app.use(checkIdempotent.check.bind(checkIdempotent));

app.use('/cart', cartRouter.getRouter());

app.get('/', (_, res) => res.send('hello'));


app.listen(3000, () => console.log('server running'));