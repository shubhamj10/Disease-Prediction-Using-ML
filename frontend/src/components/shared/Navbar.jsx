import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='bg-[#80AF81] sticky top-0 p-2 shadow'>
      <div className='flex item-center justify-between mx-auto mt-5 max-w-7xl h-11'>

      <div>
      <h1 className='text-2xl font-bold text-[#000000]'>
      Symptom <span className='text-white'>Seer</span>
      </h1>
      </div>

      <div>
        <ul className='text-custom flex font-medium item-center gap-10' >
        <li>
              <Link to="#home">Home</Link>
            </li>
            <li>
              <Link to="#about">About Us</Link>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
        </ul>
      </div>

      </div>
    </nav>
  );
}

export default Navbar;
