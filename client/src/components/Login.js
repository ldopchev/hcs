import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
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
        axios.post("http://localhost:3001/api/login", this.state)
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} >
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={this.handleChange}/>
                <label htmlFor="passport">Password:</label>
                <input type="password" id="password" name="password" onChange={this.handleChange} />
                <button type="submit">Login</button>
            </form>
        )
    }
}