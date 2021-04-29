import React from 'react'
import ShopMen from './../../assets/img/men-shop.jpg'
import ShopWomen from './../../assets/img/women-shop.jpeg'
import './styles.scss'

const Directory = props => {
    return (
        <div className="directory">
            <div
                className="item"
                style={{
                    backgroundImage: `url(${ShopWomen})`
                }}
            >
                <a className="item-link">Shop Women</a>
            </div>
            <div
                className="item"
                style={{
                    backgroundImage: `url(${ShopMen})`
                }}
            >
                <a className="item-link">Shop Men</a>
            </div>

        </div>
    )
}

export default Directory