import React from 'react'
import { Route } from 'react-router-dom';
import Products from '../../components/Pruducts/Products';
import Favorites from '../../components/Pruducts/Favorites/Favorites';

const  MainPage = (props) => {
    return (
        <div>
            <Route path='/' exact component={Products}/>   
            <Route path='/favorites' exact component={Favorites}/>
        </div>
    )
}

export default MainPage;