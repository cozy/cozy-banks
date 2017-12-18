How to develop
==============

You can use `nodemon` to watch your development files as you develop the templates.

Example :

```bash
$ nodemon --exec "node accounts-notification.js" -e js,css,hbs,json
```

This will launch `accounts-notifications.js` and relaunch it each time a
Javascript file (`templates/index.js`), a CSS file (`style.css`), Handlebars
files (every partial or template file) or JSON file (example data files in `data/`)
is changed.

The `accounts-notifications.js` runs the template `templates/accountsNotif.hbs` with
some example data to create `index.html`. You can copy/paste `index.html` into Mailchimp
and use its Preview feature to know how it will look on several email clients.

The templates are [Handlebars](handlebarsjs.com) templates using the
[mjml](https://mjml.io/documentation) language. `mjml` greatly reduces the pains to develop an
email template as it deals with a lot of quirks for you. It features ready-made
components to make responsive email templates. Behind the scene, it uses `React`
to implement custom components, and [juice](https://github.com/Automattic/juice)
to inline the CSS into the HTML. The [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts) plugin is used to provide an easy way to extend a base template (à la `jinja`)

Other templates :

```
nodemon --exec "node transactions-notification.js" -e js,css,hbs,json
```

### Assets

TODO: Assets in `assets/` should be uploaded to `https://files.cozycloud.cc` with CI.

