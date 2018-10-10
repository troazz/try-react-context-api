import React, { Component } from 'react'

class Test extends Component {
  state = {
    test: 'test'
  }

  componentDidMount() {
    console.log('ComponenntDidMount...')
  }

  // componentWillMount() {
  //   console.log('ComponentWillMount...')
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate...')
  // }

  // componentWillUpdate() {
  //   console.log('ComponentWillUpdate...')
  // }

  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('componentWillReceiveProps...', nextProps, nextState)
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     test: 'something'
  //   }
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate...', prevProps, prevState)
  // }

  render() {
    console.log('ComponentRender...')
    return (
      <div>
        <h1>Test Pages</h1>
      </div>
    )
  }
}

export default Test
