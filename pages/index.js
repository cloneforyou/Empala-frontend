import React from 'react'
import { Provider } from 'react-redux';
import RegistrationPage from './registration';
import { withReduxSaga } from '../store'

class Index extends React.Component {
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
    // return <RegistrationLayout  />
    return <RegistrationPage />

  }
}

export default withReduxSaga(Index)
