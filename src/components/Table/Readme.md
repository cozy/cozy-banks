```jsx
const col1 = { 'flex-basis': '35%', 'max-width': '35%' };
const col2 = { 'flex-basis': '35%', 'max-width': '35%' };
const col3 = { 'flex-basis': '30%', 'max-width': '30%' };

<Table>
  <thead>
    <tr>
      <th style={ col1 }>Pizzas</th>
      <th style={ col2 }>Burritos</th>
      <th style={ col3 }>Shawarma</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={ col1 }>1</td>
      <td style={ col2 }>2</td>
      <td style={ col3 }>3</td>
    </tr>
    <tr>
      <td style={ col1 }>4</td>
      <td style={ col2 }>5</td>
      <td style={ col3 }>6</td>
    </tr>
  </tbody>
</Table>
```
