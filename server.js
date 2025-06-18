require('dotenv').config();
const fastify = require('fastify')({ logger: true });
fastify.register(require('@fastify/cors'));
fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET });
fastify.register(require('fastify-mysql'), {
  promise: true,
  connectionString: process.env.DB_URL,
});
fastify.decorate("authenticate", async (req, reply) => {
  await req.jwtVerify();
});

fastify.register(require('./routes/auth'));
fastify.register(require('./routes/menu'));
fastify.register(require('./routes/orders'));
fastify.register(require('./routes/inventory'));

const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
    fastify.log.info(`Backend listening on port ${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
