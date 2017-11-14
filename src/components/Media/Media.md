Inspired by https://philipwalton.github.io/solved-by-flexbox/demos/media-object/

`align=middle` (default)

```jsx
const { Media, Figure, Body } = require('./Media');

<Media>
  <Figure>
    <img src='http://lorempixel.com/90/90/people' />
  </Figure>
  <Body>
    <Lipsum />
  </Body>
</Media>
```

`align=top`

```jsx
const { Media, Img, Bd } = require('./Media');

<Media align='top'>
  <Img>
    <img src='http://lorempixel.com/90/90/people' />
  </Img>
  <Bd>
    <Lipsum />
  </Bd>
</Media>
```

`align=bottom`

```jsx
const { Media, Img, Bd } = require('./Media');

<Media align='bottom'>
  <Img>
    <img src='http://lorempixel.com/90/90/people' />
  </Img>
  <Bd>
    <Lipsum />
  </Bd>
</Media>
```
