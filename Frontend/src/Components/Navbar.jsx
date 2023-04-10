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
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div>

            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="end"
                            style={{
                                marginRight: "1rem",
                                display: isSmallScreen ? "flex" : "none",
                            }}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(anchor, true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>   BMI Calculator </Link>
                        </Typography>


                        <Link to="/history" style={{ textDecoration: 'none', color: 'white', display: isSmallScreen ? "none" : "flex" }}> <Button color="inherit" > History   </Button></Link>
                        <Link to="" style={{ textDecoration: 'none', color: 'white', display: isSmallScreen ? "none" : "flex" }}> <Button color="inherit" > User    </Button></Link>


                    </Toolbar>
                </AppBar>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    <div
                        style={{ width: "300px" }}
                        role="presentation"
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                    >

                        <Box bgcolor={'#1976D2'} width={'200px'} m={'auto'} mb={'15px'} borderRadius={'8px'} mt="30px">   <Link to="/user" style={{ textDecoration: 'none', color: 'white', textAlign: 'center' }}> <Button color="inherit" >  User  </Button></Link>
                        </Box>


                    </div>
                </Drawer>
            </div>

        </div>
    );
}

export default Navbar;