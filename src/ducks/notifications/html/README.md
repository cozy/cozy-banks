How to develop on templates
==============

With the `TEST_TEMPLATES` environment variable, an express server serving the HTML emails will be built.

```
$ env TEST_TEMPLATES=true yarn watch:services
$ node build/testTemplates.js
Rendering emails at http://localhost:8081!
```

You can open your browser to check the emails. The Preview feature
in Mailchimp is also useful to check that everything is correctly rendered on the various email clients (just copy/paste the content of the page).

### Under the covers

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

Assets in `assets/` are uploaded to `https://downcloud.cozycloud.cc` on every deployment on CI. It can also be done manually with the `yarn uploadStaticFiles` script.

