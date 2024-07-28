import React from "react";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="w-[100vw] flex p-4 justify-between items-center shadow-2xl bg-black">
      <div className="p-2 bg-black rounded-full h-full">
        <Link to='/'>
          <img
            src="https://pixel6.co/wp-content/themes/new-pixel6-wp/assets/images/Pixel6.png"
            alt="logo"
            className="h-[40px] w-[40px] "
          />
        </Link>
      </div>
      <h1 className="m-2 text-2xl border border-white px-4 py-1 font-semibold rounded-md text-white">
        React Assignment
      </h1>
    </div>
  );
};

export default Header;
