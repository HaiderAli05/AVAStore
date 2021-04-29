import React, {Fragment, Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    getTokenInStorage,
    getUserRole
} from '../helpers/localStorage.js';

export default class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.delProduct = this.delProduct.bind(this);
        this.state = {
            loading: true,
            product: null,
            redirectToProducts: null,
            res_message: null,
        }
    }
    async componentDidMount () {
        // let ProductId = this.props.match.params.id;
        const { id } = this.props.match.params;
        const url = `https://avastore.herokuapp.com/api/products/${id}`;
        const response = await fetch(url);
        const res = await response.json();
        this.setState({product:res, loading:false});
    }
    async delProduct () {
        this.setState({loading:true});
        const token = getTokenInStorage();
        // let ProductId = this.props.match.params.id;
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
    
    render() {
        if (this.state.redirectToProducts) {
            return <Redirect to={this.state.redirectToProducts} />
          }
        return (
            <section className="py-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="display-4 text-center text-secondary mb-5">{this.state.loading || !this.state.product ? (`Product`):(`ID: ${this.state.product.data._id}`)}</h2>
                        </div>
                    </div>
                    {this.state.loading || !this.state.product ? (
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="spinner-grow text-warning" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ): (
                        <div className="row">
                            {getTokenInStorage() && getUserRole() === 1 && (
                                <Fragment>
                                <div className="col-12 d-flex pb-3">
                                        <span className="me-auto">
                                            <button to={`/products/${this.state.productId}/editProduct`} class="btn btn-outline-secondary me-2">Edit</button>
                                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Delete
                                            </button>
                                            
                                        </span>
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Delete Product</h5>
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
                                    <div className="col-12">
                                        
                                        
                                    </div>
                                </Fragment>
                            )}
                            
                            <form method="post" action={`/products/${this.state.productId}`}>
                                <div className="row">
                                    <div className="col-6">
                                        <iframe className="bg-white" width="100%" height="400px" frameborder="0"><img src={this.state.product.data.productImg} className="" alt=""/></iframe>
                                    </div>
                                    <div className="col-6">
                                        <fieldset className="text-secondary" disabled>
                                            <div className="mb-3">
                                            
                                            <input type="text" id="disabledTextInput" placeholder="Title" className="form-control bg-light" value={this.state.product.data.title}/>
                                            </div>
                                            <div className="mb-3">
                                            <label for="disabledSelect" className="form-label">Disabled select menu</label>
                                            <select id="disabledSelect" className="form-select">
                                                <option>Disabled select</option>
                                            </select>
                                            </div>
                                            <div className="mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled/>
                                                <label className="form-check-label" for="disabledFieldsetCheck">
                                                Can't check this
                                                </label>
                                            </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">But Now</button>
                                        </fieldset>
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
