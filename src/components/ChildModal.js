import * as React from 'react';
import {Box,Button,Typography,Modal,InputLabel,MenuItem,FormControl,Select,TextField,ListItemButton,ListItemText } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
import EditStatusModal from './EditStatusModal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function ChildModal({ item, token, apiUrl}) {


  const [title, setTitle] = useState([]);
  const [statusList,setStatusList] = useState([]);

  const handleStatusChange = (event) => {

    const value = event.currentTarget.value
    setTitle(value)

  }
 
  const idStatus = item.id
  const handleStatusAdd = () => {
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
 
   const statusData = {
    title,
    "categoryId":idStatus,
    "color":color
  }
 
    axios.post(
      `${apiUrl}/status`,
      statusData,
      config
    )
      .then(updateStatusList(idStatus))

      .catch(console.log);
  
  }
  useEffect(()=> {
    updateStatusList(idStatus)
},[])


  const updateStatusList = (idStatus) => {
     
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    axios.get(
      `${apiUrl}/status?categoryId=${idStatus}`,config
    )
      .then(res => 
        setStatusList(res.data) 
        )
 
  }
 
  const deleteStatus = (idStatus) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    axios.delete(
      `${apiUrl}/status/${idStatus}`,config
    )
    .then(updateStatusList(item.id))
    updateStatusList(item.id)



  }

  const [color, setColor] = useState('');

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    updateStatusList(idStatus)
  };
  const handleClose = () => setOpen(false);
  const colors = ["Yellow", "Red", "Blue", "Purple", "Black", "Brown"]
  return (
    <>
      <Button  variant="contained" onClick={handleOpen}>Status Düzenle</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{mb:"1rem"}} id="modal-modal-title" variant="h6" component="h2">
            Status Düzenlediğiniz Kategori :  {item.title}
          </Typography>

          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',mx: "auto",mb:"2rem"}}>
            <TextField onChange={handleStatusChange} name="title" id="outlined-basic" label="Status Ekle" variant="outlined" />
            <Box sx={{ width: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Renk</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
                  label="Color"
                  onChange={handleChange}
                >
                  {colors.map((color) => <MenuItem name="color" onChange={handleStatusChange} value={color}>{color}</MenuItem>)}

                </Select>
              </FormControl>
            </Box>
            <Button onClick={handleStatusAdd} variant="contained">+</Button>
          </Box>
{statusList.map((statu) =><>


  <ListItemButton key={statu.id} component="a" >
  <ListItemText primary={statu.title} />  <ListItemText sx={{textAlign: 'center'}}primary={statu.color} />



 <Button sx={{mr:"1rem"}} onClick={() => deleteStatus(statu.id)} variant="contained" >Sil</Button>
  
 <EditStatusModal 
 item={item}
 updateStatusList={updateStatusList}
 handleStatusChange={handleStatusChange}
 statu={statu}
 token={token}
 title={title}
 setTitle={setTitle}
 apiUrl={apiUrl}
 /> 
 </ListItemButton>
 </>
 
 
 )}


        </Box>
      </Modal>
      </>
  );
}