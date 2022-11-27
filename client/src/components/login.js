import axios from 'axios';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function RenderLogin(props) {
    let statehandler = props.statehandler;
    //Conditionals for Page:
    if (props.page == "loginpage") return (<LoginPage statehandler={statehandler}> </LoginPage>);
    if (props.page == "createuserpage") return (<CreateUserPage statehandler={statehandler}> </CreateUserPage>);
    return ("");
}

function CreateUserPage(props) {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/allusers').then((req) => {
            setAllUsers(req.data);
        })
    })

    const [user, setUser] = useState('');
    const [upassword, setPassword] = useState('');
    const [upasswordVerification, setPasswordVerification] = useState('')
    const [uemail, setEmail] = useState('');

    const handleUserChange = event => {
        setUser(event.target.value);
    }
    const handleEmailChange = event => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }
    const handlePasswordVerification = event => {
        setPasswordVerification(event.target.value);
    }

    const handleUserSubmit = event => {
        event.preventDefault();
        //All Errors
        let errString = ""
        let errors = false;
        let emailregex = /\S+@\S+\.\S+/;
        if (user.length == 0) {
            errString += "Error: Username cannot be empty!\n";
            errors = true;
        }
        if (!(emailregex.test(uemail))) {
            errString += "Error: Invalid email!\n";
            errors = true;
        }
        //Check if any registered user has the same email.
        for (let u = 0; u < allUsers.length; u++) {
            if (allUsers[u].email.localeCompare(uemail) == 0) {
                errString += "Error: Email is already registered with a user."
                errors = true;
                break;
            }
        }
        if (upassword.length == 0) {
            errString += "Error: Password cannot be empty!\n";
            errors = true;
        }
        if (upassword.localeCompare(upasswordVerification) != 0) {
            errString += "Error: Password Verification is not correct!\n"
            errors = true;
        }

        if (upassword.includes(user) || upassword.includes(uemail.substring(0,uemail.indexOf('@')))) {
            errors = true;
            errString += "Error: Username/Email ID cannot be a part of the password!"
        }
        //Error Check
        if (!errors) {
            const user_obj = {
                username: user,
                email: uemail,
                password: upassword
            }
            axios.post('http://localhost:8000/insertuser', user_obj).then(res => {
            });
            props.statehandler("loginpage");
            alert("Successfully created new user!");
        }
        else {
            alert(errString);
        }
    }
    return (
        <div className="loginpage">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card my-5">
                            <h1 className="text-center text-dark mt-5"> New User Creation </h1>
                            <form className="card-body p-lg-5" onSubmit={handleUserSubmit}>
                                <div className="mb-3">
                                    <input id="cuser" type="user" name="user" className="form-control" onChange={handleUserChange} value={user} placeholder="Username" />
                                </div>
                                <div className="mb-3">
                                    <input id="cemail" type="uemail" name="uemail" className="form-control" onChange={handleEmailChange} value={uemail} placeholder="Email: example@example.com" />
                                </div>
                                <div className="mb-3">
                                    <input id="cpass" type="password" name="upassword" className="form-control" onChange={handlePasswordChange} value={upassword} placeholder="Password" />
                                </div>
                                <div className="mb-3">
                                    <input id="cpass" type="password" name="upasswordVerification" className="form-control" onChange={handlePasswordVerification} value={upasswordVerification} placeholder="Verify Password" />
                                </div>
                                <div className="text-center"> <button type="submit" className="btn btn-primary w-100" id="postanswer"> Create User </button> </div>
                            </form>
                            <div className="text-center"> <button type="submit" className="btn btn-secondary w-100" id="postanswer" onClick={() => props.statehandler('loginpage')}> Back to Login </button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoginPage(props) {
    const [allUsers, setAllUsers] = useState([]);
    const [validUser, setUser] = useState("0");
    useEffect(() => {
        axios.get('http://localhost:8000/allusers').then((req) => {
            setAllUsers(req.data);
        })
    })
    const [lpassword, setPassword] = useState('');
    const [lemail, setEmail] = useState('');
    const handleEmailChange = event => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        //Check if there is a registered user with these credentials.
        const login = {
            email: lemail,
            password: lpassword
        }
        await axios.post('http://localhost:8000/login', login).then(req => {
            if (req.data != "0") {
                props.statehandler("qpage", req.data);
                alert("Logging in!")
            }
            else {
                console.log("hi");
                alert("Invalid credentials.");
            }
        })
    }

    return (
        <div className="container">
            <div className="row myrow">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5">
                        <div className="card-body p-lg-5">
                            <form onSubmit={handleLogin}>
                                <h2 className="text-center text-dark mt-5">FakeStackOverflow Login</h2>

                                <div className="text-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                        width="200px" alt="profile" />
                                </div>
                                <div className="mb-3">
                                    <input id="lemail" type="lemail" name="lemail" className="form-control" onChange={handleEmailChange} value={lemail} placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <input id="lpass" type="password" name="lpassword" className="form-control" onChange={handlePasswordChange} value={lpassword} placeholder="Password" />
                                </div>
                                <div className="text-center"><button type="submit" className="btn btn-primary px-5 w-100"> User Login</button></div>
                            </form>
                            <div className="text-center"><button type="submit" className="btn btn-dark px-5 w-100" onClick={() => props.statehandler('qpage', {username: "guest account"})}>Guest Login</button></div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                                Not Registered? <a onClick={() => props.statehandler('createuserpage')} className="text-dark fw-bold"> Create an Account </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        //States for pages:
        //qpage,answerspage,tpage,searchpage,qerrors,aerrors,qaskpage,tlinkpage
        //loginpage, createuserpage
        this.state = { page: props.page, user: false };
    }

    render() {
        let statehandler = this.props.statehandler;
        return (<RenderLogin page={this.props.page} statehandler={statehandler} user={this.props.user}></RenderLogin>);
    }
}
