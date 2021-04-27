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
import './App.css';

const App = () => {
  return(
    <BrowserRouter>
      <Header />
      <main className="bg-light w-100 h-auto py-5">
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/api/products/:id' component={SingleProduct} />
            <AdminRoute exact path='/api/user/:id' component={AdminDashboard} />
            <AdminRoute exact path='/admin/orders' component={AdminOrders} />
            <UserRoute exact path='/api/user/:id' component={UserDashboard} />
            <UserRoute exact path='/user/orders' component={UserOrders} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/register' component={Register} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
  
};

export default App;
