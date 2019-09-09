import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class User extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            redirect: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/", { withCredentials: true })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                this.setState({redirect: true});
            });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
           return <Redirect to='/login' />
        }
      }

    render() {
        const user = this.state.user;
        
        return(
            <div>
                {this.renderRedirect()}
                {user.firstName}
                {user.lastName}
                {user.email}
            </div>
        )
    }
}
