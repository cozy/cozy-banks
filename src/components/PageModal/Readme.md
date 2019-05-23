```jsx
initialState = { modalOpened: false };

<div>
  <button onClick={() => setState({ modalOpened: true })}>
    Toggle modal
  </button>
  {state.modalOpened && (
    <PageModal
      title="Test page modal"
      dismissAction={() => setState({ modalOpened: false })}
    >
      Hello world
    </PageModal>
  )}
</div>
```
