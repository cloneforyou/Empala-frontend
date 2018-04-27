import {connect} from 'react-redux'
import stylesheet from '../assets/styles/main.scss'

import ContentMenuTabs from '../components/registration/ContentMenuTabs';


import AddCount from './add-count'
import Clock from './clock'



function Page ({error, lastUpdate, light, linkTo, placeholderData, title}) {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
      <h1>
        {title}
      </h1>
      <ContentMenuTabs />
      <Clock lastUpdate={lastUpdate} light={light} />
      <AddCount />

      {placeholderData &&
        <pre>
          <code>
            {JSON.stringify(placeholderData, null, 2)}
          </code>
        </pre>}
      {error &&
        <p style={{color: 'red'}}>
          Error: {error.message}
        </p>}
    </div>
  )
}


export default connect(state => state)(Page)
