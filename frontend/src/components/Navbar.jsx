import React from 'react'
import assets from '../assets/assets.js'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Link, NavLink } from 'react-router-dom'
import CustomizedBadges from '../components/mui/StyledBadge.jsx';
import ProfileBadge from '../components/mui/ProfileBadge.jsx';
import SearchBadges from '../components/mui/SearchBadge.jsx';
import { motion, AnimatePresence } from "framer-motion";



const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { setShowSearch, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const logout = () => {
    setProfileMenuOpen(false)
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }
  const handleClick = () => {
    window.location.href = "http://localhost:5174/";
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/"><img src={assets.logo} alt="" className="w-36 " /></Link>
      <ul className="hidden sm:flex gap-5 text-sm  text-gray-700">
        <NavLink className='flex flex-col items-center gap-1' to="/">
          <p >HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to="/collection">
          <p >COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to="/about">
          <p >ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to="/contact">
          <p >CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink onClick={handleClick} className='flex flex-col items-center gap-1 ' to="/admin/src/components/login">
          <p >Admin Pannel</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

      </ul>
      <div className="flex items-center gap-0.1">
        <div className="flex mx-2 ">
          <SearchBadges onClick={() => setShowSearch(true)} />

          <div
            className="relative"
            onMouseEnter={() => token && setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >

            <ProfileBadge
              onClick={() => {
                if (!token) {
                  navigate('/login')
                  return
                }
                setProfileMenuOpen((prev) => !prev)
              }}
            />
            {
              token && profileMenuOpen &&
              <div className="absolute dropdown-menu right-0 pt-2 z-50">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100  text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <Link to={'/orders'}><p className="cursor-pointer hover:text-black">Orders</p></Link>
                  <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
              </div>
            }

          </div>
          <Link to="/cart" className="relative">
            {!visible && <CustomizedBadges />}

          </Link>
        </div>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className="w-5 cursor-pointer mx-1 sm:hidden" />

      </div>

      {/*Sidebar menu for small screen*/}
    

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 bottom-0 overflow-hidden bg-white"
          >
            <div className="flex flex-col text-gray-600">

              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
                <p>Back</p>
              </div>

              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
                Home
              </NavLink>

              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
                Collection
              </NavLink>

              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
                About
              </NavLink>

              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
                Contact
              </NavLink>

              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/orders">
                Orders
              </NavLink>

              <NavLink
                onClick={() => {
                  setVisible(false);
                  handleClick && handleClick();
                }}
                className="py-2 pl-6 border"
                to="/admin/src/components/login"
              >
                Admin Panel
              </NavLink>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Navbar
