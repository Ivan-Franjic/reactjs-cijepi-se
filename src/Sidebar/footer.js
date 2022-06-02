import React, { useState } from 'react'

import './sidebar.css'



const Footer = (props) => {

  return (
    
    <>
      <div className="footer">
      <span className="footer-text">&copy; Cijepi se {new Date().getFullYear()} • Ivan Franjić</span>
      </div>
    </>
  )
}

export default Footer