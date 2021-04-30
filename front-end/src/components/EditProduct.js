import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import defaultPic from '../img/uploadPic.png';
import { showLoading } from '../helpers/loading.js';
import { showErrorMessage , showSuccessMessage } from '../helpers/message.js'; 
// import isEmpty from 'validator/lib/isEmpty';
import {
    getTokenInStorage,
    getUserRole
} from '../helpers/localStorage.js';

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            imgNotAdded: defaultPic,
            loading: false,
            res_message: false,
            productImg: false,
            title: 'Test Product',
            description: 'This is desc',
            price: 10,
            delivery: '',
            errorMsg: false,
            redirectToProducts: null
        }
    }
    
    // Event Handlers
    handleChange = (evt) => {
        let {title, description, price, delivery} = evt.target.value;
        let productImg = evt.target.files;
        this.setState({productImg, title, description, price, delivery});
        console.log(productImg);
    };
    handleUpdate = async (evt) => {
        this.setState({loading:true});
        let {productImg, title, description, price, delivery} = this.state;
        // if(isEmpty(title) || isEmpty(description) || isEmpty(price)){
            
        //     this.setState({loading:false, errorMsg: 'All fields are required'});
        // }
        let data = new FormData();
        evt.preventDefault();

        
        // let data = {productImg, title, description, price, delivery};
        // let myForm = document.getElementById('addProduct');
        
        data.append('productImg', productImg);
        data.append('title', title);
        data.append('description', description);
        data.append('price', price);
        data.append('delivery', delivery);

        
        const token = getTokenInStorage();
        const url = 'https://avastore.herokuapp.com/api/products/addproduct';
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 
                'token': token
            },
            body: data
          });
        const res = await response.json();
        if(res.error === null){
            this.setState({loading:false, redirectToProducts:"/products"});
        }else{
            this.setState({loading:false, errorMsg: res.message});
        }
        
        console.log(this.state.errorMsg)
    }

    render() {
        return (
            <section className="py-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="display-6 text-center text-secondary mb-5">Edit Product</h2>
                        </div>
                    </div>
                    {this.state.loading ? (
                        <div className="text-center">{showLoading()}</div>
                    ): (
                        <div className="row">
                            <form method="post" action="/api/products/addproduct" className="text-secondary" enctype="multipart/form-data" id="addProduct">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        
                                        <div className="bg-white border rounded shadow productImg_section">
                                            <div className="productImg">
                                                <img src={this.state.productImg ? (
                                                    this.state.productImg
                                                ):(
                                                    this.state.imgNotAdded 
                                                )} className="newProductImg" alt="Product Image"/>
                                            </div>
                                            
                                            <div className="input-group">
                                                <input type="file" className="form-control" id="productImg" name="productImg" onChange={(evt)=>{this.handleChange(evt)}} />
                                                <label className="input-group-text productImg_label text-secondary bg-white text-uppercase" for="productImg">Upload Image</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label for="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={this.state.title} onChange={(evt)=>{this.handleChange(evt)}} />
                                        </div>
                                        <div className="mb-3">
                                            <label for="description" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={this.state.description} onChange={(evt)=>{this.handleChange(evt)}} />
                                        </div>
                                        <div className="mb-3">
                                            <label for="price" className="form-label">Price</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">$</span>
                                                <input type="number" className="form-control" id="price" name="price" placeholder="Price" value={this.state.price} onChange={(evt)=>{this.handleChange(evt)}} />
                                                <span className="input-group-text">.00</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="delivery" className="form-label">Delivery</label>
                                            <input type="text" className="form-control" id="delivery" name="delivery" placeholder="Delivery" value={this.state.delivery} onChange={(evt)=>{this.handleChange(evt)}} />
                                        </div>
                                        
                                        <button type="submit" className="btn btn-lg btn-secondary mt-3 w-100" onClick={(evt)=>{this.handleUpdate(evt)}}>Update</button>
                                        <div className="my-3">{this.state.errorMsg && showErrorMessage(this.state.errorMsg)}</div>
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
