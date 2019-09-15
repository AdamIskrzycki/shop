import React from 'react';
import './Product.css';



const Product = (props) => {
    
    return (
        <div className='Product'>
            <p>{props.name}</p>
            <p>{props.discountedPrice ? props.discountedPrice : props.price}</p>
            <button onClick={props.updateCart} className="BuyButton">Buy</button>
        </div>
    )
}

export default Product;