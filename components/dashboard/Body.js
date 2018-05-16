import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Main from './Main'

class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <Sidebar/>
          <Main/>
        </div>
      </div>
    )
  }
}

export default Body