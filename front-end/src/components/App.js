import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Header.js';
import Home from './Home.js';
import LogIn from './LogIn.js';
import Register from './Register.js';
import NotFound from './NotFound.js';
import Footer from './Footer.js';
import Products from './Products.js';
import SingleProduct from './SingleProduct.js';
import AdminDashboard from './AdminDashboard.js';
import UserDashboard from './UserDashboard.js';
import AdminRoute from './AdminRoute.js';
import UserRoute from './UserRoute.js';
import AdminOrders from './AdminOrders.js';
import UserOrders from './UserOrders.js';
import AddProduct from './AddProduct.js';
import AboutUs from './AboutUs.js';
import ContactUs from './ContactUs.js';
import EditProduct from './EditProduct.js';
import './App.css';

const App = () => {
  return(
    <BrowserRouter>
      <Header />
      <main className="bg-light">
      <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' component={SingleProduct} />
            <Route exact path='/aboutus' component={AboutUs} />
            <Route exact path='/contact' component={ContactUs} />
            <AdminRoute exact path='/addproduct' component={AddProduct} />
            <AdminRoute exact path='/products/:id/edit' component={EditProduct} />
            <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            <AdminRoute exact path='/orders' component={AdminOrders} />
            <UserRoute exact path='/user/dashboard' component={UserDashboard} />
            <UserRoute exact path='/orders/:id' component={UserOrders} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/register' component={Register} />
            <Route component={NotFound} />
          </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  )
};

export default App;