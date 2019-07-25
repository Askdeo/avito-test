import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Product from '../Product/Product';

 class Favorites extends Component {
     state = {
        favoriteProducts: '',
        areFavorites: true
     }
     componentDidMount(){
         let products = localStorage.getItem('favoriteProducts')
         if(products) {
            products = JSON.parse(products);
            console.log(products);
            this.setState({
                favoriteProducts: products
         })
         }
     }

    render() {
        let products;
        if(this.state.favoriteProducts) {
            products = this.state.favoriteProducts.map(product => {
                return (
                    <Product
                        key={product.id} 
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        seller={product.seller}
                        pictures={product.pictures}
                        areFavorites={this.state.areFavorites}
                    />
                )
            })
        }
        return (
            <div>
                <div><Link to='/'>Все объявления</Link></div>
                <div>{products}</div>
            </div>
        )
    }
}

export default Favorites;