import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Products extends Component {
    state = {
        loading: true,
        products: null,
    };
    async componentDidMount(){
        const url = "https://avastore.herokuapp.com/api/products";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({products: data.data, loading: false})
    }
    render() {
        return (
            <section className="py-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="display-4 text-center text-secondary mb-5">Products</h2>
                        </div>
                    </div>
                    {this.state.loading || !this.state.products ? (
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
                            {this.state.products.map((data) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-3">
                                    <div className="card shadow product">
                                        <div className="card-img">
                                            <Link to={`products/${data._id}`}><img src={data.productImg} className="card-img-top product-img" alt=""/></Link>
                                        </div>
                                        <div className="card-body border-top py-4">
                                            <h5 className="card-title">{data.title}</h5>
                                            <p className="card-text">{data.description}</p>
                                            <p className="prod-price">Price: ${data.price}</p>
                                            <Link to={`products/${data._id}`} className="btn btn-secondary w-100">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        )
    }
}