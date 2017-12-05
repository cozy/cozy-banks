Develop easily on mobile
=====================

It is a pain to always launch a `cordova build` to update the files
on the device we are developing on.

Fortunately, we can take advantage of the `publicPath` option of webpack so that
the `<script />`s added by `HTMLWebpackPlugin` have an `src` with the address
of the computer we are developing in.

Before

```
<script src='/build.js' />
```

After

```
<script src='http://192.168.1.36:8005/build.js' />
```

In `config/webpack.target.mobile.js`, the `publicPath` option is configured
so that you can configure it with an environment variable: 

```javascript
    publicPath: process.env.PUBLIC_PATH || '',
```

This lets you do :

```bash
# note your ip address (on ios you can use 127.0.0.1 but on Android you must get
# an address of a network interface reachable by the device)
$ ifconfig
$ # in another terminal, launch an http server in `build/`
$ cd build && python -m SimpleHTTPServer 8005 (or http-server from npm\'s http-server)
$ # finally you can launch your webpack with the proper PUBLIC_PATH env variable
$ env PUBLIC_PATH=http://${IP_ADDRESS}:8005 yarn watch:mobile
```

Release
=======

When releasing a new version for mobile, you have to bump the version in those files.

```
- config.xml
- package.json
- manifest.webapp
- package.json (généré par Cordova)
```


