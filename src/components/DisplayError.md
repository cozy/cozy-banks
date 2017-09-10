```jsx
const { I18n } = require('cozy-ui/react/I18n');

<I18n lang='en' dictRequire={(lang) => require('../locales/fr.json')}>
  <DisplayError t={ c => c } error={ new Error() } />
</I18n>
```
