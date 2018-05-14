import { combineReducers } from 'redux'
import registration from './reducers/registration'

export const InitialState = {

};

function reducer (state = InitialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  reducer,
  registration,
});
