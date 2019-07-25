import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import Product from './Product/Product';

class Products extends React.Component {
    state = {
        products: null,
        sellers: null,
        productsBlocks: null,
        category: 'all',
        priceFrom: '',
        priceUntil: '',
        favorites: []
    }

    componentDidMount () {
        axios.get('https://avito.dump.academy/products')
        .then((products) => {
            let recievedProducts = (products.data.data.filter(product => {
                return product.price !== null && product.price !== undefined
            }));
             recievedProducts = (recievedProducts.map(product => {
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    pictures: product.pictures,
                    category: product.category,
                    relationships: product.relationships
                } 
            }));
            this.setState({
                products: recievedProducts
            })
        })
        .then(() => {
            axios.get('https://avito.dump.academy/sellers')
                .then((sellers) => {
                    const recievedSellers = (sellers.data.data.map(seller => {
                        return {
                            id: seller.id,
                            name: seller.name,
                            rating: seller.rating
                        }
                    }))
                    this.setState({
                        sellers: recievedSellers
                    })
                })
                .then(() => {
                    const productsBlocks = this.state.products.map(product => {
                        return  {
                            ...product,
                            seller: this.state.sellers.filter(seller => {
                                return seller.id === product.relationships.seller
                            })[0]
                        }
                    });
                    productsBlocks.sort(function comparePrice(productA, productB) {
                        return productA.price - productB.price;
                      })
                    this.setState({
                        productsBlocks: productsBlocks
                    })
                })
            })

        .catch(err => {
            console.log(err);
        });

    }

    selectCategoryHandler = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    priceFromHandler = (event) => {
        this.setState({
            priceFrom: event.target.value
        })
    }

    priceUntilHandler = (event) => {
        this.setState({
            priceUntil: event.target.value
        })
    }


    addToFavorites = (id) => {
        let favorite = this.state.productsBlocks.filter(product => {
            return product.id === id
        })
        console.log(favorite);
        console.log(id);
        if(!localStorage.getItem('favoriteProducts')) {
            this.setState({
                favorites: [...this.state.favorites].concat(favorite)
            }, () => {
                const favorites = JSON.stringify(this.state.favorites);
                localStorage.setItem('favoriteProducts', favorites)
            })    
        }else if(localStorage.getItem('favoriteProducts')) {
            let favorites = JSON.parse(localStorage.getItem('favoriteProducts'))
            favorites = favorites.concat(favorite);
            favorites = JSON.stringify(favorites);
            localStorage.setItem('favoriteProducts', favorites);
        }
        
    }

    render() {
        let blocks;
    
    if(this.state.productsBlocks) {
        if(this.state.category === 'all') {
            if(this.state.priceFrom !== '') {
                let newBlocks = this.state.productsBlocks.filter(product => {
                        return +product.price >= +this.state.priceFrom 
                })
                if(this.state.priceUntil !== '') {
                    newBlocks = newBlocks.filter(product => {
                        return +product.price <= this.state.priceUntil
                    })
                }
                blocks = newBlocks.map(product => {
                    return (
                        <Product
                            key={product.id} 
                            id={product.id}
                            addToFavorites={this.addToFavorites}
                            title={product.title}
                            price={product.price}
                            seller={product.seller}
                            pictures={product.pictures}
                        />
                    )
                })  
                console.log(blocks);
            } else {
                let newBlocks = this.state.productsBlocks;
                if(this.state.priceUntil !== '') {
                     newBlocks = this.state.productsBlocks.filter(product => {
                        return +product.price <= this.state.priceUntil
                    })
                }
                blocks =  newBlocks.map(product => {
                    return (
                        <Product
                            key={product.id} 
                            id={product.id}
                            addToFavorites={this.addToFavorites}
                            title={product.title}
                            price={product.price}
                            seller={product.seller}
                            pictures={product.pictures}
                        />
                    )
                })
            }
            
        }
        if(this.state.category !== 'all') {
            let newBlocks = this.state.productsBlocks.filter(product => {
                return product.category === this.state.category
            })
            // this.changeBlocks(newBlocks);
            console.log(newBlocks);
            if(this.state.priceFrom === '') {
                if(this.state.priceUntil !== '') {
                    newBlocks = newBlocks.filter(product => {
                       return +product.price <= this.state.priceUntil
                   })
               }
                blocks = newBlocks.map(product => {
                    return (
                        <Product
                            key={product.id} 
                            id={product.id}
                            addToFavorites={this.addToFavorites}
                            title={product.title}
                            price={product.price}
                            seller={product.seller}
                            pictures={product.pictures}
                        />
                    )
                })        
            }
            if(this.state.priceFrom !== '') {
                newBlocks = newBlocks.filter(product => {
                        return +product.price >= +this.state.priceFrom 
                })
                if(this.state.priceUntil !== '') {
                    newBlocks = newBlocks.filter(product => {
                       return +product.price <= this.state.priceUntil
                   })
               }
                blocks = newBlocks.map(product => {
                    return (
                        <Product
                            key={product.id} 
                            id={product.id}
                            addToFavorites={this.addToFavorites}
                            title={product.title}
                            price={product.price}
                            seller={product.seller}
                            pictures={product.pictures}
                        />
                    )
                })  
                console.log(blocks);
            }
            
            
        }

             
    }
        

        return (
            <div>
                <Link to='/favorites'>Избранные объявления</Link>
                <select onChange={this.selectCategoryHandler}>
                    <option value="all">Категория</option>
                    <option value="immovable">Недвижимость</option>
                    <option value="cameras">Камеры</option>
                    <option value="laptops">Ноутбуки</option>
                    <option value="auto">Автомобили</option>
                </select>
                    <form >
                        <input onChange={this.priceFromHandler} type="text" placeholder='Цена от'/>
                        <input onChange={this.priceUntilHandler} type="text" placeholder='до'/>
                    </form>
                {blocks}
            </div>
        )
    }

}

export default Products;
