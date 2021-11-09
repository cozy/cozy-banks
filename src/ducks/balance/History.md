```jsx
const data = require('../../../test/fixtures/unit-tests.json');

<History
  accounts={data['io.cozy.bank.accounts']}
  chartProps={{
    data: [
      { x: new Date(2018, 7, 3), y: 0 },
      { x: new Date(2018, 7, 2), y: 2 },
      { x: new Date(2018, 7, 1), y: 4 },
      { x: new Date(2018, 6, 31), y: 6 }
    ],
    width: '100%'
  }}
/>
```
