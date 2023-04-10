import { useContext, useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { getProfile } from '../utils/Api';

const MenuOption = styled(MenuItem)`
    font-size: 14px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
    width: 400px
`;


const Profile = () => {
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [profile, setProfile] = useState();
    const userId = localStorage.getItem("ID") || null;


    const handleClick = async (event) => {
        const userId = localStorage.getItem("ID") || null;
        userId && setOpen(event.currentTarget);
        const res = userId && await getProfile(userId);
        setProfile(res[0])
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogout = () => {
        localStorage.clear("ID");
        window.location.reload();
    }

    return (
        <>
            <Link>   <AccountCircleIcon fontSize="large" color='error' onClick={handleClick} /></Link>
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

            >
                <MenuOption>
                    <Typography width={'100%'}>
                        Name :  {profile?.name}
                    </Typography>




                </MenuOption>
                <MenuOption><Typography> Email : {profile?.email}</Typography> </MenuOption>
                <MenuOption onClick={handleLogout}>
                    Logout
                </MenuOption>
            </Menu>

        </>
    )
}

export default Profile;
