import React from 'react';
import Login from './login';
import { Link } from 'react-router-dom';
import '../style/LoginPage.css';

// var temp = {
//     userName : 'A',
//     password : 'B',
//     isAuthenticated : false
// }

class LoginPage extends React.Component {
    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }

    state = {
        userName : 'ADMIN',
        password : 'admin',
        changeUserName : '',
        changePassword: '',
        isAuthenticated : false
    }

    login = () => {
        this.props.history.push('/clerkPage');
    }

    // handleChangeUserName = (e) => {
    //     const x = e.target.value;
    //     this.setState(()=>{
    //         return{
    //             ...this.state,
    //             changeUserName : x
    //         }
    //     });
    // }

    // handleChangePassword = (e) => {
    //     const x = e.target.value;
    //     this.setState(()=>{
    //         return{
    //             ...this.state,
    //             changePassword : x
    //         }
    //     });
    // }
    
    // handleChange = (e) => {
    //     e.preventDefault();
    //     const x = this.state.changeUserName;
    //     const y = this.state.changePassword;
    //     this.setState(()=>{
    //         return{
    //             ...this.state,
    //             userName : x,
    //             password : y,
    //             changeUserName : '',
    //             changePassword : '',
    //             isAuthenticated : false
    //         }
    //     });
    //     console.log(this.state);
    // }
    

    render(){
        return(
            <div className="container">
                <div className="loginPage">
                    <h2>Login</h2>
                    <Login info={this.state} login={this.login}/>      
                </div>
            </div>
            );
    }
}

export default LoginPage;


{/* <form onSubmit={this.handleChange}>
                                        <div>
                                            <h3>UserName :</h3>
                                            <input type='text' onChange={this.handleChangeUserName} />
                                        </div>
                                        <div>
                                            <h3>Password :</h3>
                                            <input type='text' onChange={this.handleChangePassword} />
                                        </div>
                                        <button>Save Changes</button>
                                    </form>  */}