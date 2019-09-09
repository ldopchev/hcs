import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({...this.state, [name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:3001/api/login", {username: this.state.username, password: this.state.password})
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
                this.setState({redirect: true});
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
           return <Redirect to='/' />
        }
      }

    render() {
        return(
            <>
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit} >
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={this.handleChange}/>
                    <label htmlFor="passport">Password:</label>
                    <input type="password" id="password" name="password" onChange={this.handleChange} />
                    <button type="submit">Login</button>
                </form>
            </>
        )
    }
}