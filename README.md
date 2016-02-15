react-redux-saga
---

react bindings for [redux-saga](https://github.com/yelouafi/redux-saga/)

<img src="https://i.imgur.com/Gcs02Lo.png" width="300" height="300" alt="kanyewestiskanyebest">

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

// alternately, there's a decorator version
@saga(function*(getState, props){
  //
})
class App extends Component{
  render(){
    // ...
  }
}

```

getting started
---

include `<Sagas>` high up in your react tree, and pass it the result of `createSagaMiddleware`. example -

```jsx
  let middle = createSagaMiddleware();
  let store = createStore(/* reducer */, applyMiddleware(/* ... */, middle)); // from redux

  render(<Sagas middleware={middle}>  /* react-dom, etc */
    <App />
  </Sagas>, dom);
}

```

etc
---

- this module comes from the work on [redux-react-local](https://github.com/threepointone/redux-react-local), and works well with it
