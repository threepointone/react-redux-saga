/* global describe, it, beforeEach, afterEach */
import React, { Component } from 'react'
import { Sagas, Saga, saga } from '../src/'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render, unmountComponentAtNode } from 'react-dom'
import createSagaMiddleware, { isCancelError }  from 'redux-saga'

import { cps } from 'redux-saga/effects'

const TRUE = true // satisfying eslint while(true)

import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)

function sleep(period, done) {
  setTimeout(() => done(null, true), period)
}

class SagaRoot extends Component {
  sagaMiddleware = createSagaMiddleware()
  store = createStore(
    combineReducers(this.props.reducers || { x: (x = {}) => x }),
    applyMiddleware(this.sagaMiddleware)
  )
  render() {
    return (<Provider store={this.store}>
      <Sagas middleware={this.sagaMiddleware}>
        {this.props.children}
      </Sagas>
    </Provider>)
  }
}

describe('react-redux-saga', () => {
  let node
  beforeEach(() => node = document.createElement('div'))
  afterEach(() => unmountComponentAtNode(node))

  it('should throw when you don\'t include <Sagas>', () => {
    let run = function*() {}
    expect(() => render(<Saga saga={run} />, node)).toThrow()
  })

    // sagas
  it('accepts a saga', done => {
    let started = false

    let run = function*() {
      started = true
      yield cps(sleep, 300)
      done()
    }

    expect(started).toEqual(false)

    render(<SagaRoot><Saga saga={run}/></SagaRoot>, node)
    expect(started).toEqual(true)
  })

  it('starts when the component is mounted', () => {
    // as above
  })

  it('gets cancelled when the component unmounts', done => {
    let unmounted = false

    let run = function*() {
      try {
        while (TRUE) {
          yield cps(sleep, 100)
        }
      }
      catch (e) {
        if (isCancelError(e) && unmounted === true) {
          done()
        }
      }
    }


    render(<SagaRoot><Saga saga={run} /></SagaRoot>, node)

    sleep(500, () => {
      unmounted = true
      unmountComponentAtNode(node)
    })


  })

  it('can receive props', done => {
    let run = function*(_, { x }) {
      expect(x).toEqual(123)
      done()
    }

    render(<SagaRoot><Saga saga={run} x={123} /></SagaRoot>, node)
  })

  it('can read from global redux state', done => {
    let run = function *(getState) {
      expect(getState().x.a).toEqual(123)
      done()
    }

    render(<SagaRoot reducers={{ x: (state = { a: 123 }) => state }}>
      <Saga saga={run} />
    </SagaRoot>, node)

  })

  it('decorator version', () => {

    let App = saga(function*(getState, { x }) {
      expect(getState().x).toEqual({ a: 123 })
      expect(x).toEqual(123)

    })(
    class App extends Component {
      render() {
        return null
      }
    })

    render(<SagaRoot reducers={{ x: (state = { a: 123 }) => state }}>
      <App x={123}/>
    </SagaRoot>, node)

  })
})
