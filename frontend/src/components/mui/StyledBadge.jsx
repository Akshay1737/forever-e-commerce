import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    
    backgroundColor: '#000',
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
     // responsive fix
    [theme.breakpoints.down('sm')]: {
      right: -6,
      top: 8,
      fontSize: '0.65rem',
      minWidth: 16,
      height: 16,
    },
  },
}));

export default function CustomizedBadges() {
   const {getCartCount}=useContext(ShopContext);
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={getCartCount()} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
