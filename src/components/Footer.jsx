import React from 'react';
import '../css/styles.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className='col-md-3'>
            <h3>Contact Us</h3>
            <ul className='contact-info'>
              <li>123 Main Street, New York, NY 10001</li>
              <li>(123) 456-7890</li>
              <li> info@example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
