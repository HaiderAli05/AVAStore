import React from 'react';
import productsList from './api-data/products.js';
import { allProducts } from '../api/products.js';
import {Link} from 'react-router-dom';

const Products = () => {
    return (
        <div>
           <div className="row ">
               <div className="col-12">
                   <h2 className="display-4 text-center text-secondary mb-5">Products</h2>
               </div>
               {
                //    productsList.map((data) => (
                //     <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-3">
                //         <div className="card shadow product">
                //         <Link to={`products/${data._id}`}><img src={data.image} className="card-img-top" alt=""/></Link>
                //             <div className="card-body">
                //                 <h5 className="card-title">{data.title}</h5>
                //                 <p className="card-text">{data.description}</p>
                //                 <p className="prod-price">Price: ${data.price}</p>
                //                 <Link to={`products/${data._id}`} className="btn btn-secondary w-100">View Details</Link>
                //             </div>
                //         </div>
                //     </div>
                //     ))
                   allProducts()
                   .then(response => {
                       let products = response.data.data;
                    //    products.map((product) => (
                    //         <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-3">
                    //         <div className="card shadow product">
                    //         <Link to={`products/${product._id}`}><img src={product.image} className="card-img-top" alt=""/></Link>
                    //             <div className="card-body">
                    //                 <h5 className="card-title">{product.title}</h5>
                    //                 <p className="card-text">{product.description}</p>
                    //                 <p className="prod-price">Price: ${product.price}</p>
                    //                 <Link to={`products/${product._id}`} className="btn btn-secondary w-100">View Details</Link>
                    //             </div>
                    //         </div>
                    //         </div>
                    //    ))
                       
                    productsList.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-3">
                            <div className="card shadow product">
                            <Link to={`products/${product._id}`}><img src={product.image} className="card-img-top" alt=""/></Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="prod-price">Price: ${product.price}</p>
                                    <Link to={`products/${product._id}`} className="btn btn-secondary w-100">View Details</Link>
                                </div>
                            </div>
                        </div>
                        ))
                        
                    })
                   .catch(err => {
                       console.log({"message": err.message})
                   })
                   
               }
           </div>
        </div>
    )
}

export default Products;
