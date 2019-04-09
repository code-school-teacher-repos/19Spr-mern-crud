import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";

class ProductHome extends Component{
    constructor(props) {
        super(props);
        this.state= {
            data: [],
        };
        this.loadCollection();
    }

    componentDidMount() {
        this.loadCollection();
    }

    loadCollection=(e)=>{
        fetch('/list')
            .then(data=>data.json())
            .then(response=>this.setState({data:response}));
    };

    render(){
        return(<div>
                    <Router>
                        <Link className="navLinks" to="/" onClick={this.loadCollection}>Home</Link>
                        <Link className="navLinks" to="/add">Add Product</Link>
                        <Route path="/" exact component={()=><ProductList collectionArray={this.state.data} loadCollection={this.loadCollection}/>}/>
                        {/*<Route path="/edit/:id" component={EditToDo}/>*/}
                        <Route path="/add" component={ProductAdd}/>
                    </Router>
                </div>
        );
    }
}

export default ProductHome;