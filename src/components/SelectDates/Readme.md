```
const SelectDates = require('./SelectDates').default;

initialState = { value: undefined };
<SelectDates
  periods={
    ['2018-08', '2018-07', '2018-06', '2017-05']
  }
  value={state.value}
  onChange={value => setState({ value })}
  show12months
  />
```
