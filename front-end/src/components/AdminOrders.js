import React, { Component, Fragment } from 'react';
import {
    getTokenInStorage,
    getUserRole
} from '../helpers/localStorage.js';
import { showLoading } from '../helpers/loading.js';

export default class AdminOrders extends Component {
    constructor(props) {
        super(props);
        // this.changeOrderStatus = this.changeOrderStatus.bind(this);
        this.state = {
            loading: false,
            orders: null,
            sr_No: 1,
        };
    }
    state = {
        loading: false,
        orders: null,
        sr_No: 1,
    };
    async componentDidMount() {
        this.setState({ loading: true })
        const token = getTokenInStorage();
        const url = `https://avastore.herokuapp.com/api/orders`;
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
    // async changeOrderStatus(orderId){
    //     console.log(orderId);
    //     // this.setState({loading:true});
    //     // let userId = getUserInStorage().id;
    //     // let userEmail = getUserInStorage().email;
    //     // const productId = this.props.match.params.id;
    //     // let {title, price, delivery} = this.state.product.data;
    //     // let quantity = this.state.quantity;
    //     // let totalPrice = price * quantity;
    //     // let data = {userId,userEmail,productId,title,unitPrice:price,quantity,totalPrice,status:'Under Review'};

    //     // const token = getTokenInStorage();
    //     // const url = `https://avastore.herokuapp.com/api/orders/${orderId}`;
    //     // const response = await fetch(url, {
    //     //     method: 'PUT',
    //     //     headers: { 
    //     //         'token': token,
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify(data)
    //     //   });
    //     // const res = await response.json();
    //     // console.log(res)
    //     // if(res.error === null){
    //     //     this.setState({loading:false, redirectToOrders:`/orders/${userId}`});
    //     // }else{
    //     //     this.setState({loading:false, errorMsg: res.message});
    //     // }
    // }

    render() {
        return (
            <section>
                <div className="container py-5">
                    <h2 className="display-4 text-secondary m-0 text-center">All Orders</h2>
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
                                                            <th scope="row">User ID:</th>
                                                            <td>{data.userId}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">User Email:</th>
                                                            <td>{data.userEmail}</td>
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
                                                <div class="text-muted d-flex"><strong>Status: </strong> {data.status}
                                                {getTokenInStorage() && getUserRole() === 1 && (
                                                    <Fragment>
                                                            <span className="ms-auto">
                                                                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editOrderStatus">
                                                                    Edit
                                                                </button>
                                                            </span>
                                                            <div class="modal fade" id="editOrderStatus" tabindex="-1" aria-labelledby="editOrderStatusLabel" aria-hidden="true">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="editOrderStatusLabel">Change Order Status</h5>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <select class="form-select" aria-label="Default select example">
                                                                            <option value="2" selected>Under Review</option>
                                                                            <option value="2">Approved</option>
                                                                            <option value="3">On Delivery</option>
                                                                            <option value="3">Completed</option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                        <button type="button" class="btn btn-secondary" onClick="" data-bs-dismiss="modal">Save</button>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </Fragment>
                                                )}
                                                </div>
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