require('dotenv').config();

const server = require('./api/server');

const PORT = process.env.PORT;

server.get('/', (req, res) => res.send(`Welcome to the Wingly API on ${PORT}`));

server.listen(PORT, () => console.log(`listening on port:${PORT}`));

