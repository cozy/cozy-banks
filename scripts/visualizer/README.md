Link visualizer
===============

This is an [express] server that serves a webpage meant to show
links that are found between bills and banking operations by our matching
algorithm.

To launch the server, run the following commands:

```console
yarn build
yarn serve
```

Then you can go to http://localhost:3000. There you have a minimal interface
where you can trigger a search for links between bills and operations.

### Developing

To develop, you can use watch mode.

#### Client

For the client, you can run `yarn watch:client`. This will watch front-end
files and compile them to the dist folder served by the express server.
Also, `yarn build:client` will compile the client one time.

#### Server

For the server, you can run `yarn watch:server` to compile the server on every
change, and `yarn serve:watch` to restart the server everytime it has been
compiled. `yarn build:server` will compile the server one time.

[express]: https://expressjs.com/
