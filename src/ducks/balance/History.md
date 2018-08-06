```jsx
const data = require('./history_data.json');

<History
  accounts={data['io.cozy.bank.accounts']}
  transactions={data['io.cozy.bank.operations']}
/>
```
