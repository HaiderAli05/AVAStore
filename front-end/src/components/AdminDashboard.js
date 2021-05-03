import React, { Component } from 'react';
import {
    getUserInStorage
} from '../helpers/localStorage.js';

export default class AdminDashboard extends Component {
    state = {
    }
    componentDidMount(){
        let person;
        if(getUserInStorage().role === 1){
            person = "Admin";
        }else{
            person = "User";
        }
        let {firstName,lastName,email,phone,country} = getUserInStorage();
        this.setState({
            role: person,
            firstName,
            lastName,
            email,
            phone,
            country,
        })
    }
    render() {
        return (
            <section>
            <div className="container py-5">
                <h2 className="display-5 text-secondary m-0 text-center">Profile</h2>
                <div className="row">
                    <div className="col-6 mx-auto">
                    <table class="table table-hover table-bordered text-secondary mt-5">
                            <thead>
                                <tr>
                                <th scope="col">Role</th>
                                <th scope="col">{this.state.role}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First Name:</td>
                                    <td>{this.state.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>{this.state.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td>{this.state.phone}</td>
                                </tr>
                                <tr>
                                    <td>Country:</td>
                                    <td>{this.state.country}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
