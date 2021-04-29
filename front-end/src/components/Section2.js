import React from 'react'

const Section2 = () => {
    return (
        <div className="bg-light">
            <div className="container">
                <div className="row py-5" >
                    <div className="col-lg-6 py-5">
                        <h2 className="text-secondary text-uppercase">Get to Know Us</h2>
                        <p className="lead mt-4">Trade is an online marketplace bringing together buyers and sellers in the aerospace industry from around the world. On our marketplace, premium sellers can only list parts that have product images, quality documents and price. Transparency and frictionless experience for the buyer is our goal. Our marketplace has been featured in Forbes, The Wall Street Journal and Harvard Business Review and is rapidly moving from “small startup” to “major disruptor.”</p>
                    </div>
                    <div className="col-lg-6 py-5">
                    <iframe className="bg-white" width="100%" height="300px" src="https://www.youtube.com/embed/H45vSzyiXH4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section2
