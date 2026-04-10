import React, { useContext } from 'react'
import assets from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'
import SearchBadges from './mui/SearchBadge.jsx';

import TextField from '@mui/material/TextField';
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext)

  const location = useLocation()

  const isVisible =
    location.pathname === '/collection' && showSearch

  return isVisible ? (
    <div className="border-t border-b text-center">
      <div className="inline-flex items-center  px-5 pt-1 pb-1 mt-2 mx-5 my-2  sm:w-1/2">
        

      
       <TextField
    onChange={(e) => setSearch(e.target.value)}
    label="Search"
    value={search}
    variant="outlined"
    fullWidth
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        height: '45px',          // 👈 height here
       


        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#c1c1c1',
        },

        '& input': {
          color: 'black',
        },
      },

      '& .MuiInputLabel-root': {
        color: 'black',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'black',
      },
    }}
    InputProps={{
      endAdornment: <SearchBadges />,
    }}
  />
  </div >
      <img
        src={assets.cross_icon}
        alt="Close"
        onClick={() => setShowSearch(false)}
        className="hidden sm:inline w-3 cursor-pointer"
      />
    </div>
  ) : null
}

export default SearchBar
