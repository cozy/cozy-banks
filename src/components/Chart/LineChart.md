```jsx
<LineChart
  width={300}
  height={150}
  data={[
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 }
  ]}
  margin={{
    top: 0,
    bottom: 20,
    left: 10,
    right: 10
  }}
  showAxis
/>
```

```jsx
const d3 = require('d3');

<LineChart
  width={300}
  height={150}
  data={[
    { x: new Date(2018, 7, 3), y: 0 },
    { x: new Date(2018, 7, 2), y: 2 },
    { x: new Date(2018, 7, 1), y: 4 },
    { x: new Date(2018, 6, 31), y: 6 }
  ]}
  margin={{
    top: 0,
    bottom: 20,
    left: 10,
    right: 10
  }}
  nbTicks={2}
  tickFormat={d3.timeFormat('%x')}
  xScale={d3.scaleTime}
  showAxis
/>
```

```jsx

const d3 = require('d3');

<LineChart
  width={300}
  height={150}
  data={[
    { x: new Date(2018, 7, 3), y: 0 },
    { x: new Date(2018, 7, 2), y: 2 },
    { x: new Date(2018, 7, 1), y: 4 },
    { x: new Date(2018, 6, 31), y: 6 }
  ]}
  margin={{
    top: 0,
    bottom: 20,
    left: 10,
    right: 10
  }}
  nbTicks={2}
  tickFormat={d3.timeFormat('%x')}
  xScale={d3.scaleTime}
  gradient={{
    '0%': 'steelblue',
    '100%': 'white'
  }}
  showAxis
/>
```
