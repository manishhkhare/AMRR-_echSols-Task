import React from 'react'
import { Link } from 'react-router-dom'
import './component.css'

export const Header = () => {
  return (
    <div className="header">
    <div className="container">
      <nav className="navbar">
          <h1 className="logo">
            <img src="src/assets/favpng_77d3911c92290e93fb5971f4bfe6bd96.png" className='img-fluid h-100' alt="" />
        </h1>
        <ul className="nav-links">
          <li><Link to="/Additems">Add Items</Link></li>
          <li><Link to="/Showitems">Show Items</Link></li>
        </ul>
      </nav>
    </div>
  </div>
  
  )
}
