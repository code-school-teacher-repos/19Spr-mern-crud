import React, { Component } from 'react';

class ProductAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            productID: 0,
            price: 0,
            quantity: 0,
            addedData: "",
        };
    }

    handleSubmit=(e)=>{
        console.log("Adding");
        e.preventDefault();

        fetch('/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productID: e.target.productID.value,
                    productName: e.target.productName.value,
                    price: e.target.price.value,
                    quantity: e.target.quantity.value,
                }),
            }
        )
            .then(()=>this.setState({addedData: "Data Added"}));
    };

    render(){
        return(

            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="productID">Product ID:</label>
                        <input type="text" name="productID" id="productID" placeholder="Enter product ID here"/>
                    </p>

                    <p>
                        <label htmlFor="productName">Product Name:</label>
                        <input type="text" name="productName" id="productName" placeholder="Enter product name here"/>
                    </p>

                    <p>
                        <label htmlFor="price">Price:</label>
                        <input type="text" name="price" id="price" placeholder="Enter price here"/>
                    </p>

                    <p>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="text" name="quantity" id="quantity" placeholder="Enter quantity here"/>
                    </p>

                    <input type="submit" value="Submit" />
                </form>
                <h1>{this.state.addedData}</h1>
            </div>
        );
    }
}

export default ProductAdd;