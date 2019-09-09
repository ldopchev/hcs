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
        const transport = axios.create({
            withCredentials: true
          })
        transport.get("http://localhost:3001/")
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
