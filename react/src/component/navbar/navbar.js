import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./navbar.css"
import { connect } from 'react-redux';
import { actionsStore } from '../../redux/actions/actions'
import { useHistory } from 'react-router-dom'

function mapStateToProps(state) {
  return {
    users: state.users
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUserName: (value) => dispatch(actionsStore.setUserName(value)),
  setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value))

})

export default connect(mapStateToProps,mapDispatchToProps)(function ComponentName(props) {
const { setUserName, setUserEmail, users } = props;
// const history = useHistory()

const logout =()=>{
    
    setUserEmail('')
    // history.push('login')
}
// const componentName = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <div className="container-fluid">
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div >
                        <ul id="nav">                       
                            <li >
                            {users.email !==''&&<Link to="/loginp">picture of today</Link>}
                            </li>
                            <li>
                            {users.email !==''&&<Link to="/addPicture">Add picture</Link>}
                            </li>
                            <li >
                            {users.email !==''&&<Link to="/pictureHistory">pictures history</Link>}
                            </li>
                            <li>
                            <Link to="/login">Log In</Link>
          
                            </li>
                            <li>
                            <Link onClick={logout}to="/" >Log out</Link>
                            {/* <button onClick={logout()}>Log out</button> */}
                            </li>
                            {/* <li >
                            <Link to="/SignUp">Sign In</Link>
                            </li> */}
                        </ul>
                        {/* <span className="navbar-text"></span>  */}
                    </div>
                </div>
            </nav>
        </div>
    )
})
// export default componentName
