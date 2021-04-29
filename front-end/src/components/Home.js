import React, { Fragment } from 'react';
import Slider from './Slider.js';
import Products from './Products.js';
import Section1 from './Section1.js';
import Section2 from './Section2.js';

const Home = () => {
    return (
        <Fragment>
            <Slider />
            <Products />
            <Section1 />
            <Section2 />
        </Fragment>
        
        
    )
};
export default Home;