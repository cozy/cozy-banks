Link visualizer
===============

This is a small [express] server that serves a webpage meant to show
links that are found with `cozy-konnector-libs` between bills and
banking operations.

To launch the server, use `yarn serve`, then you can go to http://localhost:3000.

There you have a minimal interface where you can trigger a search for links
between bills and operations.

### Developing the front-end

`yarn watch` will watch front-end files and compile them to the dist folder served by the express server.

`yarn build` will build the front-end files once.

[express]: https://expressjs.com/
