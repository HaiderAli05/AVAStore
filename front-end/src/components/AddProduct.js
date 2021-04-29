import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import {
    getTokenInStorage,
    getUserRole
} from '../helpers/localStorage.js';

export default class AddProduct extends Component {
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
    async delProduct () {
        this.setState({loading:true});
        const token = getTokenInStorage();
        // let ProductId = this.props.match.params.id;
        const { id } = this.props.match.params;
        const url = `https://avastore.herokuapp.com/api/products/addproduct`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'token': token
            },
          });
        const res = await response.json();
        this.setState({loading:false, redirectToProducts:"/products", res_message: res.message});
    }

    render() {
        return (
            <div>
                <Fragment>
                    {getTokenInStorage() && getUserRole() === 1 && (
                        <div className="row">
                            <div className="col-12">
                                <Redirect to="/addproduct" class="btn btn-outline-secondary" onClick={this.addProduct} >Create Now</Redirect>
                            </div>
                        </div>
                    )}
                </Fragment>
            </div>
        )
    }
}
