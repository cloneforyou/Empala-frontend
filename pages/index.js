import React from 'react'
import {withReduxSaga} from '../store'
import RegistrationPage from './registration';


class Index extends React.Component {

  render () {

    return <RegistrationPage />

  }
}

export default withReduxSaga(Index)
