import React from 'react'
import {assets} from '../assets/assets'
import Button from "@mui/material/Button";
const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between  '>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
       
        <Button
        onClick={logout}
        
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          paddingX: "28px",
          paddingY: "9px",
          fontSize: "13px",
          borderRadius: "9999px",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Navbar
