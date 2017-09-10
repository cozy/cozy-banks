```jsx
const Select = require('./Select.jsx').default

const options = [
  { name: 'Burritos', value: 'burritos' },
  { name: 'Lasagnes', value: 'lasagnes' },
  { name: 'Gâteau au chocolat', value: 'gateau' }
]
const log = function (selectName, selectValue) {
  console.log(selectName, selectValue)
};

<Select name='nourriture' value='burritos' options={options} onChange={ log } />
```
