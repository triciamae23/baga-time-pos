// routes/auth.js
const bcrypt = require('bcrypt');

async function authRoutes(fastify, options) {
  fastify.post('/register', async (req, reply) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await fastify.mysql.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
    reply.send({ message: 'User registered' });
  });

  fastify.post('/login', async (req, reply) => {
    const { username, password } = req.body;
    const [rows] = await fastify.mysql.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!rows.length || !(await bcrypt.compare(password, rows[0].password))) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    const token = fastify.jwt.sign({ id: rows[0].id });
    reply.send({ token });
  });

  fastify.decorate("authenticate", async function (req, reply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

module.exports = authRoutes;