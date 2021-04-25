import React from 'react';
import { connect } from 'react-redux';
import { setState, useState, useEffect } from 'react'
import './addpicture.css'
import { actionsStore } from '../redux/actions/actions'

// function myFunc(event) {
//     console.log('load picture', event)

// }
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => ({
    setUserName: (value) => dispatch(actionsStore.setUserName(value)),
    setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value))

})

export default connect(mapStateToProps, mapDispatchToProps)(function AddPIcture(props) {
    const { setUserName, setUserEmail, users } = props;
    // export default function AddPIcture(props) {
    const [img, setImg] = useState();
    const [explanation, setexplanation] = useState();
    const [date, setdate] = useState();
    const [title, settitle] = useState();

    const add1 = () => {
        alert("Picture added")

        var myHeaders = new Headers();
        myHeaders.append("Authorization", document.cookie ? document.cookie.split(";").filter(x => x.includes("jwt"))[0].split("=").pop() : null);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "date": date,
            "explanation": explanation,
            "title": title,
            "url": img,
            "isUsers": true
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`http://localhost:3001/createPicture/${users.email} `, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }



    const onChangeHandlerProfile = (event) => {
        const fileReader = new FileReader();
        const file = event;
        fileReader.onload = (e) => {
            console.log('reader.result', fileReader.result)
            setImg(e.target.result);
            console.log(img, 'img')
            //משתנה ביוזסטייט
        };
        fileReader.readAsDataURL(file);
        // setFile(file);
        // const onChangeHandlerProfile = (event) => {
        //     var myFile = new FormData()

        // myFile.onload = (e) => {
        //     console.log('reader.result', myFile.result)
        //     setImg(e.target.result);
        //     console.log(img, 'img')
        //     //משתנה ביוזסטייט
        // };
        // myFile.append("file", event)
        // console.log(event.name)
        // setImg(myFile);
        // // myFile.readAsDataURL(file);
        // // setFile(file);קש
        // console.log(myFile)
    }

    return (

        <div class="image-upload" >
            {/* <label for="profileImg"> */}
            <div id="form"> {/* </label> */}
                <input type="file" id="dorzki-image" name="dorzki-image" accept=".jpg,.jpeg,.png,.mp4" onChange={(e) => onChangeHandlerProfile(e.target.files[0])} />
                <br />
                <br />
                <input id="inputtext" type="text" placeholder="title" onChange={(e) => settitle(e.target.value)} />
                <br />
                <br />
                <input type="date" placeholder="date" onChange={(e) => setdate(e.target.value)} />
                <br />
                <br />
                <textarea type="text" placeholder="explanation" rows="5" cols="40" onChange={(e) => setdate(e.target.value)} />
                <br />
                <br />
                {<img className="img_person conversation-photo" width="25%" high="1000px" referrerpolicy="no-referrer" src={img} />}
                <br />
                <button id="button1" onClick={add1} >add picture</button>
            </div>
            {/* // <div class="image-upload">
        //     <form action="#" method="post" enctype="multipart/form-data">
        //         <label for="dorzki-image">Upload Image:</label>
        //         <input type="file" id="dorzki-image" name="dorzki-image" accept=".jpg,.jpeg,.png,.mp4" onChange={(e) => onChangeHandlerProfile(e.target.files[0])} />
        //         <button type="submit">Upload!</button>
        //     </form>
        //     <input type="text" placeholder="title" />
        //     <br />
        //     <br />
        //     <input type="date" placeholder="date" />
        //     <input type="text" placeholder="explanation" />
        // </div> */}
        </div>
    );
})
{/* <input type="file" name="Image" onChange={myFunc} /> */ }



{/* <input
                type={"file"}
                id="profileImg"
                htmlFor="myInput"
                accept="image/*"
                style={{
                    display: 'none',
                    cursor: 'pointer',
                    float: 'right'
                    //   width:'5px',
                }}
                onChange={(e) => onChangeHandlerProfile(e.target.files[0])}
            /> */
}
