import React, { Component } from 'react';
import ProductEdit from "./ProductEdit";


class ProductList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editData: {},
            noEditElement: true,
            editElementJSX: "",
        };
    }

    deleteProduct=(e)=>{
        fetch('/delete/'+e.target.name,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productID: e.target.name,
                }),
            }
        )
            .then(()=>this.props.loadCollection());
    };

    backHome=()=>{
        this.setState({noEditElement: true,})
    };

    editPrep=(e)=>{
        fetch('/edit/'+e.target.name)
            .then(data=>data.json())
            .then(response=>
            {
                console.log(response);
                return this.setState({editData: response})
            })
            .then(()=>this.setState({noEditElement: false}));
    };

    render(){
        let mappedCollectionOfFetchedData = this.props.collectionArray.map(
            (eachElement)=>{
                return( <ul key={eachElement.productID}>
                            <div>{eachElement.productName} Qty: {eachElement.quantity} Price: {eachElement.price} ID: {eachElement.productID}
                                {/*<a className="navLinks" href={"/edit/"+eachElement.productID}>Edit</a>*/}
                                <a className="navLinks" href="#" name={eachElement.productID} onClick={this.editPrep}>Edit</a>
                                <a className="navLinks" href="#" name={eachElement.productID} onClick={this.deleteProduct}>Delete</a>
                                <hr/>
                            </div>
                        </ul>);
            }
        );
        if(mappedCollectionOfFetchedData.length<1)
            mappedCollectionOfFetchedData=<p>No data in database</p>;

        let editElementJSX = "";
        if(this.state.noEditElement) {
            editElementJSX = <div>
                    <h1>List of elements</h1>
                    {mappedCollectionOfFetchedData}
                </div>;
        }
        else{
            editElementJSX = <ProductEdit editData={this.state.editData} backhome={this.backHome} loadCollection={this.props.loadCollection}/>;
        }
        // return(<div>{this.state.editElementJSX}</div>);
        return(<div>{editElementJSX}</div>);
    }
}

export default ProductList;