import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    backgroundColor: '#000',
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 0px',
  },
}));

export default function SearchBadges() {
      const{setShowSearch}=useContext(ShopContext);
  return (
    <IconButton aria-label="search" onClick={() => setShowSearch(true)}>
      <StyledBadge  color="secondary">
        <SearchIcon />
      </StyledBadge>
    </IconButton>
  );
}
