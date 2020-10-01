import React, { Component } from 'react';

import Cart from "./components/cart";
import ProductList from "./components/product-list";

import './App.css';
import 'h8k-components';

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
        this.changeCart = this.changeCart.bind(this)
    }

    changeCart(product, i, isRemove = false) {
        console.log("addCart", product)
        let products = [...this.state.products];
        let cartItems = [...this.state.cart.items];
        let newProduct = {...products[i]}
        if (!isRemove) {
            newProduct.cartQuantity = newProduct.cartQuantity+1;
            
        } else {
            newProduct.cartQuantity = newProduct.cartQuantity-1;
        }
        let finditem = cartItems.find(item=>item.name === newProduct.name)
        if (finditem) {
            finditem.name = newProduct.name
            finditem.quantity = newProduct.cartQuantity
        } else {
            cartItems = [...cartItems, {
                item: newProduct.name,
                quantity: newProduct.cartQuantity
            }]
        }
        products[i] = newProduct
        this.setState({products})
        this.setState({cart:{
            items: [...cartItems]
        }})
    }


    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} changeCart={this.changeCart}/>
                    <Cart cart={this.state.cart}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
