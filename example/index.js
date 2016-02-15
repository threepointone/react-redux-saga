
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Sagas, Saga } from '../src'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { cps } from 'redux-saga/effects'

const TRUE = true // whetever rackt

function sleep(period, done) {
  setTimeout(() => done(null, true), period)
}

function *run(_, { callback }) {
  while(TRUE) {
    yield cps(sleep, 1000)
    callback()
  }
}

class App extends Component {
  state = { x: 0 };
  onNext = () => {
    this.setState({
      x: this.state.x + 1
    })
  }
  render() {
    return (<div>
      <Saga saga={run} callback={this.onNext} />
      {this.state.x}
    </div>)
  }
}

const reducers = {
  x: (x = {}) => x
}

class SagaRoot extends Component {
  sagaMiddleware = createSagaMiddleware();
  store = createStore(combineReducers(reducers), {}, applyMiddleware(this.sagaMiddleware));

  render() {
    return (<Provider store={this.store}>
      <Sagas middleware={this.sagaMiddleware}>
        {this.props.children}
      </Sagas>
    </Provider>)
  }
}

render(<SagaRoot><App/></SagaRoot>, document.getElementById('app'))
