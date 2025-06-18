// routes/inventory.js
async function inventoryRoutes(fastify, options) {
  fastify.get('/inventory', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const [rows] = await fastify.mysql.query('SELECT * FROM inventory');
    reply.send(rows);
  });

  fastify.put('/inventory/:menuId', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const { stock } = req.body;
    await fastify.mysql.query('UPDATE inventory SET stock = ? WHERE menu_id = ?', [stock, req.params.menuId]);
    reply.send({ message: 'Stock updated' });
  });
}
module.exports = inventoryRoutes;