```
const Select = require('react-select').default

const handleChangeMonth = value => {
  setState({ value })
};

<Select
  searchable={false}
  name="month"
  value={state.value}
  width={'10rem'}
  className={'customSelect'}
  options={[
    {value: 1, name: 1},
    {value: 2, name: 2},
    {value: 3, name: 3},
    {value: 4, name: 4},
    {value: 5, name: 5},
  ]}
  onChange={handleChangeMonth}
/>
```
