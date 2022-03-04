import * as React from 'react';
import {AppBar,Box,Toolbar,Typography ,Button,} from '@mui/material';


const Navbar = ({setIsLogged}) => {
  return (
    <Box sx={{ flexGrow: 1, width:900, mx:"auto" }}>
      <AppBar position="static">
        <Toolbar>
           
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color="inherit"  onClick={() => setIsLogged(false)} >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar