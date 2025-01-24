const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleware = jsonServer.defaults();

server.db = router.db;

server.use(middleware);
server.use(auth);
server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
