import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import defaultPic from '../img/uploadPic.png';
import { showLoading } from '../helpers/loading.js';
import { showErrorMessage } from '../helpers/message.js'; 
import {getTokenInStorage} from '../helpers/localStorage.js';

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.productImg = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleImgPreview = this.handleImgPreview.bind(this);
        this.state = {
            imgNotAdded: defaultPic,
            loading: false,
            productImgPreview: null,
            errorMsg: false,
            redirectToProducts: null,
        }
    }
    
    async componentDidMount () {
        this.setState({loading:true});
        const { id } = this.props.match.params;
        console.log(id);
        const url = `https://avastore.herokuapp.com/api/products/${id}`;
        const response = await fetch(url);
        const res = await response.json();
        this.setState({
            productImg:res.data.productImg,
            title:res.data.title,
            description:res.data.description,
            price:res.data.price,
            delivery:res.data.delivery,
            loading:false});
    }
    // Event Handlers
    handleChange = (evt) => {
        this.setState({[evt.target.name] : evt.target.value});
    };
    handleImgPreview = (evt) => {
        this.setState({productImgPreview: URL.createObjectURL(evt.target.files[0])})
    };
    handleUpdate = async (evt) => {
        evt.preventDefault();
        this.setState({loading:true});

        let newproductImg = this.productImg.current.files[0];
        let {productImg, title, description, price, delivery} = this.state;
        console.log(title)
        
        let img;
        if(!newproductImg === null){
            img = newproductImg
        }else{
            img = productImg
        }
        console.log(img)
        let data = new FormData();
        data.append('productImg', img);
        data.append('title', title);
        data.append('description', description);
        data.append('price', price);
        data.append('delivery', delivery);

        
        const productId = this.props.match.params.id;
        const token = getTokenInStorage();
        const url = `https://avastore.herokuapp.com/api/products/${productId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 
                'token': token,
            },
            body: data
          });
        const res = await response.json();
        if(res.error === null){
            this.setState({loading:false, redirectToProducts:"/products"});
            console.log(res);
        }else{
            this.setState({loading:false, errorMsg: res.message});
        }
        
    }
    render() {
        if (this.state.redirectToProducts) {
            return <Redirect to={this.state.redirectToProducts} />
        }
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
                            <form method="put" onSubmit={this.handleUpdate} className="text-secondary" enctype="multipart/form-data" id="addProduct">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        
                                        <div className="bg-white border rounded shadow productImg_section">
                                            <div className="productImg">
                                                <img src={this.state.productImgPreview ? (
                                                    this.state.productImgPreview
                                                ):(
                                                    this.state.productImg 
                                                )} className="newProductImg" alt="Product Img"/>
                                            </div>
                                            
                                            <div className="input-group">
                                                <input type="file" className="form-control" id="productImg" name="productImg" ref={this.productImg}  onChange={(evt)=>{this.handleImgPreview(evt)}} />
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
                                        
                                        <button type="submit" className="btn btn-lg btn-secondary mt-3 w-100" >Update Now</button>
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
