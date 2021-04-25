import { connect } from "react-redux";
import userName from '../../redux/reducers/userName'
import React, { useEffect, useState } from 'react'
import './login.css'
import { useHistory } from 'react-router-dom'
import { actionsStore } from '../../redux/actions/actions'

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUserName: (value) => dispatch(actionsStore.setUserName(value)),
  setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value))

})

export default connect(mapStateToProps,mapDispatchToProps)(function Register(props) {
  const history = useHistory()
  const { setUserName, setUserEmail, user } = props;
  const [name, setName] = useState({ name: "" })
  const [useremail, setUseremail] = useState({ useremail: "email" })
  const [userPassward, setUserPassward] = useState({ userPassward: "" })
  const [MessagEmail, setMessagEmail] = useState()
  const [MessagName, setMessagName] = useState()
  const [Messagpassward, setMessagpassward] = useState()



  //   const setUserName = (value) => {
  //     setUserNameByDispatch(value)
  //   }
  //   const setUserEmail = (value) => {
  //     setUserEmailDispatch(value)
  // }

  const showmessage = (m) => {
    alert(m)
  }

  const validate = () => {
    console.log(useremail)
    let email1 = useremail;
    let password1 = userPassward;
    let name1 = name;
    let fail = true;
    // check password minimal length
    if (password1.length < 6) {
      setMessagpassward('password too short');
      fail = false;
    }

    if (email1.useremail === "email" || email1.indexOf("@") <= 0 )
    {
      setMessagEmail("not valid email address");
      fail = false;
    }
    // // check email
    // if (email1.useremail === "") {
    //   setMessagEmail("not valid email address");
    //   fail = false;
    // }
    if (name1.length < 1) {
      setMessagName("name not valid");
      fail = false;
    }
    if (fail) {
      submitRegister()
    }
  }

  const submitRegister = () => {
    console.log(name, useremail, userPassward)
    // fetch(`http://localhost:3001/createUser`, {
    //   method: 'POST'
    //   headers: {
    //     Accept: 'application/json',
    //     "Counter-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name: Name,
    //     mail: Useremail,
    //     password: UserPassward
    //   })
    // }).then(resp => resp.json()).then(data => {
    //   console.log(data);
    //   if (data) {
    //     history.push('loginP')
    //     setUserName(Name) 
    //     showmessage()
    //   }
    // })


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": name,
      "mail": useremail,
      "password": userPassward
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3001/api/createUser", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.isIn == true) {
          showmessage(" the user is exiest")
        }
        else {
          document.cookie="jwt"+"="+result.token+';'
          showmessage("User created")
          setUserName(name)
          setUserEmail(useremail)
          history.push('loginP')
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      {/* <h1>{user.name}</h1> */}
      {/* <input onChange={(e) => setUserName(e.target.value)}></input>  */}
      <div className="inner-container">
        <div className="header">
          <p style={{ display: 'inline-block', borderBottom: "2px solid" }}> Sign up</p><p style={{ display: 'inline-block', paddingLeft: "20px" }} onClick={() => history.push('/login')}> Log in</p>
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              onChange={(e) => setName(e.target.value)}
              placeholder="Username" />
          </div>
          <p className="message">{MessagName}</p>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              onChange={(e) => setUseremail(e.target.value)}
              placeholder="Email" />
          </div>
          <p className="message">{MessagEmail}</p>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              onChange={(e) => setUserPassward(e.target.value)}
              placeholder="Password" />
          </div>
          <p className="message">{Messagpassward}</p>
          <button
            type="button"
            className="login-btn"
            onClick={validate}>Sign In</button>
        </div>
      </div>

    </>
  )
})

