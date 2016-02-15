react-redux-saga
---

react bindings for [redux-saga](https://github.com/yelouafi/redux-saga/)

![kanyewestiskanyebest](https://i.imgur.com/Gcs02Lo.png)

```jsx
import {Saga} from 'react-redux-saga';

// Saga as a component
// starts running once it mounts
// gets cancelled when it unmounts
<Saga saga={function * (){ /* your saga */ }} />

// you can read redux state / passed props
function* run(getState, {x, y}){
  // getState().key.state...
  // x === 1
  // y === 2
}

<Saga x={1} y={2} saga={run} />

```

getting started
---

include `<Sagas>` high up in your react tree, and pass it the result of `createSagaMiddleware`. example -

```jsx
  let middle = createSagaMiddleware();
  let store = createStore(/* reducer */, middle); // from redux

  render(<Sagas middleware={middle}>  // react-dom, etc
    <App />
  </Sagas>, dom);
}

```

etc
---

- this module comes from the work on [redux-react-local](https://github.com/threepointone/redux-react-local), and works well with it