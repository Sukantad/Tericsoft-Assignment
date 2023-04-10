import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import {

    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Profile from '../pages/Profile';

function Navbar() {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const anchor = "left";



    const theme = useTheme();
    const userId = localStorage.getItem("ID") || null;
    return (
        <div>

            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>   BMI Calculator </Link>
                        </Typography>


                      {userId? <>  <Link to="/history" style={{ textDecoration: 'none', color: 'white', }}> <Button color="inherit" > History   </Button></Link>
                        <Profile /> </> :""}

                    </Toolbar>
                </AppBar>

            </div>

        </div>
    );
}

export default Navbar;