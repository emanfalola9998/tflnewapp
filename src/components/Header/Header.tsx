import './Header.scss'
import tflLogo from '../../images/tfllogo.jpeg'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
    <div className="header">
        <img className= "header__image" src={tflLogo}  alt="Bootstrap Themes" />
        <h1 className="header__heading">Bus Lines</h1>

    </div>

    )
}

export default Header
