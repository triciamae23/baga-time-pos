// routes/orders.js
async function orderRoutes(fastify, options) {
  fastify.post('/orders', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const { userId } = req.user;
    const { items, total } = req.body;

    const [result] = await fastify.mysql.query(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)',
      [userId, total]
    );
    const orderId = result.insertId;

    for (let item of items) {
      await fastify.mysql.query(
        'INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.menuId, item.quantity]
      );
      // Decrease inventory
      await fastify.mysql.query(
        'UPDATE inventory SET stock = stock - ? WHERE menu_id = ?',
        [item.quantity, item.menuId]
      );
    }

    reply.send({ orderId });
  });

  fastify.get('/orders', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const [orders] = await fastify.mysql.query('SELECT * FROM orders');
    reply.send(orders);
  });
}
export default orderRoutes;