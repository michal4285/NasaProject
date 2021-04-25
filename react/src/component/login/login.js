import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import './login.css'
import { useHistory } from 'react-router-dom'
import { actionsStore } from '../../redux/actions/actions'

function mapStateToProps(state) {
  return {
    user: state.users
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUserName: (value) => dispatch(actionsStore.setUserName(value)),
  setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value))

})

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  const history = useHistory()
  const { setUserName, setUserEmail, user } = props;

  const [email, setEmail] = useState()
  const [passward, setpassward] = useState()
  const setMessage = () => {
    alert("one or more details are not correct");
  }
  const submitLogin = () => {
    console.log('email:', email)
    fetch(`http://localhost:3001/api/getUserByMail/${email}`, {
      method: 'GET',
    }).then(response => response.json()).then(data => {
      console.log('data:', data)
      if (data) { // console.log(passward)
        if (data.user.password == passward) {
          document.cookie = "jwt" + "=" + data.token + ';'
          setUserName(data.user.name)
          console.log(data.user.mail)
          setUserEmail(data.user.mail)
          console.log("users.email", user.email)
          history.push('loginP')
        }
        else setMessage()
      }
      else {
        setMessage()
      }

    }

    )
  }

  return (
    <>
      <div className="inner-container">
        {/* <div className="header" onClick={() => history.push('/SignIn')}> Sign In</div> */}
        <div className="header">
          <p style={{ display: 'inline-block', borderBottom: "2px solid" }}> Log in</p><p style={{ display: 'inline-block', paddingLeft: "20px" }} onClick={() => history.push('/SignUP')}> Sign up</p>
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              onChange={(e) => setpassward(e.target.value)}
              placeholder="Password" />
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={submitLogin}>Login</button>
        </div>
      </div>
    </>
  )
})
