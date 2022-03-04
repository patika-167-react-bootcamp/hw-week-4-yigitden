
import { TextField,AppBar,Tabs,Tab ,Typography,Button,Box,useTheme   } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Content from './Content';
 

function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function Auth({setIsLogged}) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [registerFormData, setRegisterFormData] = useState({});
  const [loginFormData, setLoginFormData] = useState({});


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  const handleRegisterFieldChange = (event) => {


    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setRegisterFormData(prev => ({ ...prev, [name]: value }))

  }

  const handleLoginFieldChange = (event) => {


    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setLoginFormData(prev => ({ ...prev, [name]: value }))

  }
  const handleRegister = () => {
    axios
      .post('http://localhost:80/auth/register', registerFormData)
      .then((response) => {
        document.cookie = `token = ${response.data.token}`
        setIsLogged(true)
      })
  }

  const handleLogin = () => {
    axios
      .post('http://localhost:80/auth/login', loginFormData)
      .then((response) => {
        document.cookie = `token = ${response.data.token}`
        setIsLogged(true)
      })
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 500,mx:"auto", }}>
      <AppBar position="static">
        <Tabs

          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="LOGIN" {...a11yProps(0)} />
          <Tab label="REGISTER" {...a11yProps(1)} />

        </Tabs>
      </AppBar>
      <SwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        
       
       
        
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',flexDirection:'column' }}>
          <TextField sx={{mb:"2rem"}} id="outlined-basic" name="username" onChange={handleLoginFieldChange} label="Username" variant="outlined" />
          <TextField sx={{mb:"2rem"}} id="outlined-basic" name="password" onChange={handleLoginFieldChange} label="Password" type="password" variant="outlined" />
          <Button onClick={handleLogin} variant="contained">Login</Button>
          </Box>
        </TabPanel> 
         <TabPanel  value={value} index={1} dir={theme.direction}>
         <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',flexDirection:'column' }}>
          <TextField  sx={{mb:"2rem"}}  name="username" onChange={handleRegisterFieldChange} id="outlined-basic" label="Username" variant="outlined" />
          <TextField  sx={{mb:"2rem"}}  name="password" onChange={handleRegisterFieldChange} id="outlined-basic" label="Password" type="password" variant="outlined" />
          <TextField  sx={{mb:"2rem"}}  name="passwordConfirm" onChange={handleRegisterFieldChange} id="outlined-basic" label="Password Confirm" type="password" variant="outlined" />
          <Button onClick={handleRegister} variant="contained">Register</Button>
          </Box>
        </TabPanel>
       
      </SwipeableViews>
    </Box>
  );
}

function App() {
  const token = getCookie("token")
  const apiUrl= "http://18.196.80.227:80"


  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    
    if (token) setIsLogged(true)
  },[])

  return (
    <div>
      {isLogged ? <><Content  token = {token} setIsLogged={setIsLogged} apiUrl={apiUrl}/></> : <Auth setIsLogged={setIsLogged} />}
    </div>

  )
}




export default App;
