// routes/menu.js
async function menuRoutes(fastify, options) {
  fastify.get('/menu', async (req, reply) => {
    const [rows] = await fastify.mysql.query('SELECT * FROM menu');
    reply.send(rows);
  });
}
module.exports = menuRoutes;