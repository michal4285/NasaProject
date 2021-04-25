
import produce from 'immer'
import createReducer from './reducerUtills'

const intioanalState = {
    users:
      { name: '', email: '' ,token:''}
  }
  const users = {
    setUserEmail(state, action) {
      state.users.email=action.payload
      // alert('hello email')
    },
    setUserName(state, action) {
      // alert('hello userName')
      state.users.name=action.payload
    },
    setToken(state, action) {
      // alert('hello userName')
      state.users.token=action.payload
    }
  
  }
  export default produce((state, action) => createReducer(state, action, users), intioanalState);
  
  
  