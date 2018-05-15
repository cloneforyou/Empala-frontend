import React from 'react'
import { withReduxSaga } from '../store'
import { connect } from 'react-redux';
import Header from '../components/dashboard/Header';
import Body from '../components/dashboard/Body';
import stylesheet from '../assets/styles/main.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'next/link'

class Home extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <MuiThemeProvider>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
        <Header/>
        <Body/>
      </MuiThemeProvider>
    )
  }
}

export default withReduxSaga(Home)
