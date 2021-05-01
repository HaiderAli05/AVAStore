import React, {Fragment, Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    getTokenInStorage,
    getUserInStorage,
    getUserRole
} from '../helpers/localStorage.js';
import { showLoading } from '../helpers/loading.js';
import { showErrorMessage } from '../helpers/message.js'; 

export default class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.delProduct = this.delProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.state = {
            loading: true,
            product: null,
            quantity: 1,
            redirectToProducts: null,
            redirectToEditProduct: null,
            redirectToOrders: null,
            redirectToLogin: null,
            res_message: null,
            errorMsg: null,
        }
    }
    async componentDidMount () {
        const { id } = this.props.match.params;
        const url = `https://avastore.herokuapp.com/api/products/${id}`;
        const response = await fetch(url);
        const res = await response.json();
        this.setState({product:res, loading:false});
    }
    async delProduct () {
        this.setState({loading:true});
        const token = getTokenInStorage();
        const { id } = this.props.match.params;
        const url = `https://avastore.herokuapp.com/api/products/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
                'token': token
            },
          });
        const res = await response.json();
        this.setState({loading:false, redirectToProducts:"/products", res_message: res.message});
    }
    // Event Handlers
    handleChange = (evt) => {
        this.setState({quantity : evt.target.value,});
    };
    async addOrder(){
        this.setState({errorMsg:null})
        this.setState({loading:true});
        let userId = getUserInStorage().id;
        let userEmail = getUserInStorage().email;
        const productId = this.props.match.params.id;
        let {title, price, delivery} = this.state.product.data;
        let quantity = this.state.quantity;
        let totalPrice = price * quantity;
        let data = {userId,userEmail,productId,title,unitPrice:price,quantity,totalPrice,status:'Under Review'};

        
        const token = getTokenInStorage();
        const url = 'https://avastore.herokuapp.com/api/orders/addorder';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
        const res = await response.json();
        console.log(res)
        if(res.error === null){
            this.setState({loading:false, redirectToOrders:"/orders/:id"});
        }else{
            this.setState({loading:false, errorMsg: res.message});
        }
    }
    goToLogin(){
        this.setState({redirectToLogin: '/login'})

    }
    editProduct(){
        this.setState({
            loading:true,
            redirectToEditProduct:`/products/${this.state.product.data._id}/edit`,
        })
    }
    
    render() {
        if (this.state.redirectToProducts) {
            return <Redirect to={this.state.redirectToProducts} />
        }
        if (this.state.redirectToEditProduct) {
            return <Redirect to={this.state.redirectToEditProduct} />
        }
        if (this.state.redirectToOrders) {
            return <Redirect to={this.state.redirectToOrders} />
        }
        if (this.state.redirectToLogin) {
            return <Redirect to={this.state.redirectToLogin} />
        }
        return (
            <section className="py-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="display-6 text-center text-secondary mb-5">{this.state.loading || !this.state.product ? (`Product`):(`Product ID: ${this.state.product.data._id}`)}</h2>
                        </div>
                        
                            {getTokenInStorage() && getUserRole() === 1 && (
                                <Fragment>
                                    <div className="col-md-12 d-flex pb-3">
                                        <span className="ms-auto">
                                            <button class="btn btn-outline-secondary me-2" onClick={this.editProduct}>Edit</button>
                                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delProduct">
                                                Delete
                                            </button>
                                        </span>
                                        <div class="modal fade" id="delProduct" tabindex="-1" aria-labelledby="delProductLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="delProductLabel">Delete Product</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    Are you sure that you want to delete this product ?
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-danger" onClick={this.delProduct} data-bs-dismiss="modal">Delete</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )}
                    </div>
                    {this.state.loading ? (
                        <div className="text-center">{showLoading()}</div>
                    ): (
                        <div className="row">
                            <form className="text-secondary" enctype="multipart/form-data" id="addProduct">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        
                                        <div className="bg-white border rounded shadow single-productImg_section">
                                            <div className="productImg">
                                                <img src={this.state.product.data.productImg} className="newProductImg" alt="Product Image"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <fieldset className="text-secondary" disabled>
                                        <div className="mb-3">
                                            <label for="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={this.state.product.data.title}/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="description" className="form-label">Description</label>
                                            <textarea type="text" className="form-control" id="description" name="description" placeholder="Description" value={this.state.product.data.description} ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label for="price" className="form-label">Price</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">$</span>
                                                <input type="number" className="form-control" id="price" name="price" placeholder="Price" value={this.state.product.data.price} />
                                                <span className="input-group-text">.00</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="delivery" className="form-label">Delivery</label>
                                            <input type="text" className="form-control" id="delivery" name="delivery" placeholder="Delivery" value={this.state.product.data.delivery} />
                                        </div>
                                        </fieldset>
                                        {getTokenInStorage() && getUserInStorage() ? (
                                        <Fragment>
                                        <button type="button" className="btn btn-lg btn-secondary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#addOrder">Buy Now</button>
                                        <div className="my-3">{this.state.errorMsg && showErrorMessage(this.state.errorMsg)}</div>
                                        <div class="modal fade" id="addOrder" tabindex="-1" aria-labelledby="addOrderLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="addOrderLabel">Add Order</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="mb-3">
                                                        <label for="quantity" className="form-label">Please set the quantity for this product.</label>
                                                        <input type="number" className="form-control" id="quantity" name="quantity" placeholder="quantity" value={this.state.quantity} onChange={(evt)=>{this.handleChange(evt)}} required/>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={this.addOrder}>Order Now</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Fragment>):(
                                            <button type="button" className="btn btn-lg btn-secondary mt-3 w-100" onClick={this.goToLogin}>Buy Now</button>
                                        )}
                                        <div className="text-center">{this.state.loading && showLoading()}</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        )
    }
}