const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const port = 7000;
const init = async () => {
  // eslint-disable-next-line new-cap
  const server = Hapi.Server({
    port: port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`server running at localhost:${port}`);
};

init();
