Cozy Template
=============

What's Cozy?
------------

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.


What's cozy-template?
---------------------

This repository is a client-side app skeleton for Cozy Cloud<sup>v3</sup>. We keep it up-to-date with our habits and best-practices. It allow you to bootstrap an app from scratch in a breeze.


Use it
------

### Step 1: clone the app

```sh
$ git clone \
  --origin=template \
  --depth=1 \
  https://github.com/cozy/cozy-template.git \
  my-app
```

### Step 2: customize templates resources

The [`my-app/.templates`](.templates) dir contains some templates you can use in your final repository. You should copy them to the root of your project (excepted the `.transifexrc` file). Be careful that those files contains some _vars_ you must replace to have the files fully functional:

- `<APP_NAME>`: the application name
- `<APP_SHORT_DESCRIPTION>`: a quick app description
- `<APP_PORT>`: app running port
- `<APP_MAINTAINER>`: Github main maintainer username (don't forget `@` :))
- `<SLUG_TX>`: transifex app slug
- `<SLUG_GH>`: Github repository slug
- `<SLUG_NPM>`: NPM slug
- `<USERNAME_GH>`: Github username

Don't forget to update your LICENSE too if needed.

### Step 3: add your own repository

Go to https://github.com/new and create a new repository for your app. Then add it to your app:

```sh
$ git remote add \
  origin \
  https://github.com/<USERNAME_GH>/<SLUG_GH>.git
$ git add -am "Initial commit for my-app"
$ git pull -u origin master:master
```

### That's it :rocket:!

Congrats! Your app is now fully set. You can start coding in [`src`](src), and run it through a [cozy-stack](https://cozy.github.io/cozy-stack/).

You can find more informations about how to bootstrap a Cozy app in the [Cozy's app bootstrap<sup>v3</sup>](http://talks.m4dz.net/cozy-bootstrap-v3/) talk.


Community
---------

### Maintainer

The lead maintainer for cozy-template and tooling is [@m4dz](https://github.com/m4dz), send him a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


License
-------

cozy-template is developed by Cozy Cloud and distributed under the [AGPL v3 license][agpl-3.0].


[cozy]: https://cozy.io "Cozy Cloud"
[agpl-3.0]: https://www.gnu.org/licenses/agpl-3.0.html
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/mycozycloud
