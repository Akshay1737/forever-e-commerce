import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
  
    backgroundColor: '#000',
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 0px',
    gap:'0px'
  },
}));

export default function ProfileBadge({ onClick }) {
  return (
    <IconButton aria-label="profile" onClick={onClick}>
      <StyledBadge  color="secondary">
        <AccountCircleIcon />
      </StyledBadge>
    </IconButton>
  );
}
