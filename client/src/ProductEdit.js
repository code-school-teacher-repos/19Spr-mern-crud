import React, { Component } from 'react';

class ProductEdit extends Component{
    constructor(props) {
        super(props);
        console.log(this.props.editData);
    }


    returnForm=(e)=>{
        this.props.backhome();
        console.log("Editing");
        e.preventDefault();

        fetch('/editChange/'+this.props.editData.productID,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: e.target.productName.value,
                    price: e.target.price.value,
                    quantity: e.target.quantity.value,
                }),
            }
        ).then(()=>this.props.loadCollection());
            // .then(()=>this.setState({addedData: "Data Added"}));
    };

    render(){
        return(
            <div>
                <h1>Edit Post</h1>
                <form method="POST" onSubmit={this.returnForm}>
                    <p>
                        <label htmlFor="productName">Product Name:</label>
                        <input type="text" name="productName" id="productName" placeholder={"Enter product name here"} defaultValue={this.props.editData.productName}/>
                    </p>

                    <p>
                        <label htmlFor="price">Price:</label>
                        <input type="text" name="price" id="price" placeholder="Enter price here" defaultValue={this.props.editData.price}/>
                    </p>

                    <p>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="text" name="quantity" id="quantity" placeholder="Enter quantity here" defaultValue={this.props.editData.quantity}/>
                    </p>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ProductEdit;