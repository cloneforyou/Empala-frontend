import React from 'react'

import RegisrationPage from './registration';
import {withReduxSaga} from '../store'

class Counter extends React.Component {

  render () {

    return <RegisrationPage />

  }
}

export default withReduxSaga(Counter)
