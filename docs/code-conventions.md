Code organisation
=================

### Components

If components have an associated style, group the style with the component into
a folder. Ex: `BackButton`

### Ducks

* Ducks groups actions/reducers/views for a particular high-level function

* Sometimes you can have a duck without views, typically when it concerns
a particular doctype.

Code conventions
=====

### Constructor

Avoid `constructor` if you can by leveraging `transform-class-properties`

❌  Bad :

```
class MyComponent extends Component {
  constructor () {
    super()
    this.state = { counter: 0 }
  }
}
```

✅  Good

```
class MyComponent extends Component {
  state = { counter: 0 }
}
```

### Binding event handlers

Avoid binding event handlers in `constructor`, leverage `transform-class-properties`
and arrow functions.

❌  Bad :

```
class MyComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick (ev) {
    ...
  }
}
```

✅  Good

```
class MyComponent extends Component {
  onClick = (ev) => {
    ...
  }
}
```
