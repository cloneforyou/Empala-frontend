import React from 'react'

import {increment, loadData, startClock, tickClock} from '../actions'
import {withReduxSaga} from '../store'
import RegistrationLayout from '../components/RegistrationLayout'

class Counter extends React.Component {
//   static async getInitialProps ({store, isServer}) {
//     store.dispatch(tickClock(isServer))
//     store.dispatch(increment())
//     if (!store.getState().placeholderData) {
//       store.dispatch(loadData())
//     }
//   }
//
//   componentDidMount () {
//     this.props.dispatch(startClock())
//   }

  render () {


    // return <Page title='Index Page' linkTo='/other' />
    return <RegistrationLayout  />
  }
}

export default withReduxSaga(Counter)
