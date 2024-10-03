import React, { useState } from 'react';
import { Link } from 'react-scroll';
import Girl from '../assets/icons/girl.png'; // Update the path to your image

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-800 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="h-11 w-auto" src={Girl} alt="Your Company" />
            <p className="rounded-md px-3 py-2 text-lg font-medium text-gray-300">
              LEARN DSA
            </p>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link
                activeClass="active"
                to="intro"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                onClick={() => {
                  setShowMenu(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Home
              </Link>
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={10}
                duration={500}
                className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setShowMenu(false)}
              >
                About
              </Link>
              <Link
                activeClass="active"
                to="Team"
                spy={true}
                smooth={true}
                offset={150}  // Adjust this value as needed
                duration={500}
                className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setShowMenu(false)}
              >
                Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;