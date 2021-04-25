import produce from 'immer';
import createReducer from './reducerUtills'
// const initialState={
//   name:'',
//   email:'' 
// }

// export default produce((state, action) =>
// {
//     switch(action.type){
//         case 'SET_USERNAME':
//             state.name=action.payload
//             break;
//             case'SET_USEREMAIL':
//             state.Email=action.payload
//             break;
//             default:
//             return state;
//     }
// },initialState)

const intioanalState = {
  users:
    { name: '', email: '' }
}
const users = {
  setUserEmail(state, action) {
    state.name=action.payload
  },
  setUserName(state, action) {
    state.Email=action.payload
  },

}
export default produce((state, action) => createReducer(state, action, users), intioanalState);


