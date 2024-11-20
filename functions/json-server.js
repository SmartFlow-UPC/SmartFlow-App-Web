const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json'); // Ubicación relativa del archivo db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

exports.handler = async (event, context) => {
    return new Promise((resolve) => {
        server.listen(3000, () => {
            resolve({
                statusCode: 200,
                body: JSON.stringify({ message: 'JSON Server is running!' }),
            });
        });
    });
};
