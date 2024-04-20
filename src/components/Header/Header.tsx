import './Header.scss'
import tflLogo from '../../images/tfllogo.jpeg'
import React from 'react'

const Header = () => {
    return (
    <section className="header">
        <img className= "header__image" src={tflLogo}  alt="Bootstrap Themes" />
        <h1 className="header__heading">Bus Lines</h1>
    </section>

    )
}

export default Header
