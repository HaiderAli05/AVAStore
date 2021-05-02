import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    getTokenInStorage,
    getUserInStorage,
    getUserRole
} from '../helpers/localStorage.js';
import { showLoading } from '../helpers/loading.js';

export default class UserOrders extends Component {
    state = {
        loading: false,
        orders: null,
        sr_No: 1,
    };
    async componentDidMount() {
        this.setState({ loading: true })
        let userId = getUserInStorage().id;
        const token = getTokenInStorage();
        const url = `https://avastore.herokuapp.com/api/orders/${userId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        this.setState({ orders: data.data, loading: false })
    }

    render() {
        return (
            <section>
                <div className="container py-5">
                    <h2 className="display-4 text-secondary m-0 text-center">Orders</h2>
                    {this.state.loading || !this.state.orders ? (
                        <div className="text-center my-5">{showLoading()}</div>
                    ) : (
                        <Fragment>
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
                                {this.state.orders.map((data) => (
                                    <div class="col">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h5 class="card-title display-6">{data.title}</h5>
                                                <hr/>
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Order Id:</th>
                                                            <td>{data._id}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Order Date:</th>
                                                            <td>{data.date}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Product Price:</th>
                                                            <td>{data.unitPrice}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Quantity:</th>
                                                            <td>{data.quantity}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Total Price:</th>
                                                            <td>{data.totalPrice}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="card-footer">
                                                <span class="text-muted"><strong>Status: </strong>{data.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                
                                ))}
                            </div>
                        </Fragment>
                    )}
                </div>
            </section>
        )
    }
}









// import React from 'react'

// const UserOrders = () => {
//     return (
//         <section>
//             <div className="container py-5">
//                 <h2 className="display-4 text-secondary m-0 text-center">Orders</h2>
//                 <table class="table table-striped table-hover table-bordered text-secondary mt-5">
//                     <thead>
//                         <tr>
//                             <th scope="col">Sr. #</th>
//                             <th scope="col">Order ID</th>
//                             <th scope="col">User ID</th>
//                             <th scope="col">User Email</th>
//                             <th scope="col">Product ID</th>
//                             <th scope="col">Product Title</th>
//                             <th scope="col">Unit Price</th>
//                             <th scope="col">Quantity</th>
//                             <th scope="col">Total Price</th>
//                             <th scope="col">Order Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th scope="row">1</th>
//                             <td>12345678910</td>
//                             <td>12345678910</td>
//                             <td>useremail@test.com</td>
//                             <td>12345678910</td>
//                             <td>Product01</td>
//                             <td>$10</td>
//                             <td>5</td>
//                             <td>$50</td>
//                             <td>Under Review</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">2</th>
//                             <td>12345678910</td>
//                             <td>12345678910</td>
//                             <td>useremail@test.com</td>
//                             <td>12345678910</td>
//                             <td>Product01</td>
//                             <td>$10</td>
//                             <td>5</td>
//                             <td>$50</td>
//                             <td>Under Review</td>
//                         </tr><tr>
//                             <th scope="row">3</th>
//                             <td>12345678910</td>
//                             <td>12345678910</td>
//                             <td>useremail@test.com</td>
//                             <td>12345678910</td>
//                             <td>Product01</td>
//                             <td>$10</td>
//                             <td>5</td>
//                             <td>$50</td>
//                             <td>Under Review</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </section>
//     )
// }

// export default UserOrders
