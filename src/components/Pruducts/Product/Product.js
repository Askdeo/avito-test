import React from 'react';
import './Product.css';

const Product = (props) => {
    return (
        <div className='product-container'>
            <div>
                <p>{props.title}</p>
                <img style={{ height: '300px', width: '300px'}} src={props.pictures[0]} alt="Главное фото(первое в списке) + количество дополнительных"/>
                <p>+{props.pictures.length - 1} фото</p>
            </div>
            <p>Цена: {props.price ? props.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') : null}</p>
            {/* <p>Дата размещения объявления в офрмате 10 октября 10:37</p> */}
            <div className='seller'>Продавец: {props.seller.name}, рейтинг: {props.seller.rating}</div>
            <div>{!props.areFavorites ? <button onClick={() => props.addToFavorites(props.id)}>Добавить в избранное</button> : null}</div>
        </div>
    )
}

export default Product;
