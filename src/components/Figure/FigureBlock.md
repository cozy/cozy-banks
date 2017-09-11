Pour montrer une KPI importante.

```jsx
<div>
  <FigureBlock
    label='Balance totale'
    total={1000}
    currency='EUR'
    coloredPositive coloredNegative signed />

  <FigureBlock
    label='Balance totale (negative number)'
    total={-1000}
    currency='EUR'
    coloredPositive coloredNegative signed />

  <FigureBlock
    label='Balance totale (no color)'
    total={-1000}
    currency='EUR'
    signed />
</div>
```
