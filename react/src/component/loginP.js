import React from 'react';
import { connect } from 'react-redux';
// import { actions } from './actions'
// import React, { Component } from 'react'
import { actionsStore } from '../redux/actions/actions'
import { setState, useState, useEffect } from 'react'


function mapStateToProps(state) {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => ({
    setUserName: (value) => dispatch(actionsStore.setUserName(value)),
    setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value)),

})

export default connect(mapStateToProps,mapDispatchToProps )(function PictureOfToday(props) {
    const { setUserName, setUserEmail, users } = props;
    const [pictureUrl, setpictureUrl] = useState();
    const [picture, setPicture] = useState([]);

    function add(picture) {

        setPicture(picture)
        console.log("current user    " , users)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", document.cookie ? document.cookie.split(";").filter(x => x.includes("jwt"))[0].split("=").pop() : null);
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("authorization", user);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(picture),
        };


        fetch(`http://localhost:3001/createPicture/${users.email}`, requestOptions)
            .then(response => response.json())
            .then(res => console.log(res))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        console.log("loginPPPPPPPp:::", users)
        window.scrollTo(0, 0);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://api.nasa.gov/planetary/apod?api_key=FCbdx6GCtOiNEwjkoaYa42ohpHHZihIJipb81Obi", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)

                add(result);
                console.log('pictureUrl', pictureUrl);

            })
            .catch(error => console.log('error', error));

    }, [])
    return (
        <>
            <div  ><h1 style={{ color: "green" }}>Picture Of The Day</h1>
                <div className="card" className="apod" style={{ width: "25rem" }}>
                    <h1>NASA Astronomy Picture Of The Day</h1>
                    <h2>{picture.title}</h2>
                    <p className="card-text">{picture.date}</p>
                    {picture.media_type === "video" && <iframe src={pictureUrl} controls="controls" autoplay="autoplay"></iframe>}
                    {picture.media_type === "image" && <img src={picture.url} className="card-img-top" alt="img" />}
                    <div className="card-body">
                        <p className="card-text">{picture.explanation}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
)
// export default connect(
//     (state) => {
//         return {
//             userName: state.userName
//         }
//     },
//     (dispatch) => {
//         return {
//             setUserNameByDispatch: (value) => dispatch({ type: 'SET_USERNAME', payload: value }),
//             setUserEmailDispatch: (value) => dispatch({ type: 'SET_USEREMAIL', payload: value })
//         }
//     }
// )(PictureOfToday)