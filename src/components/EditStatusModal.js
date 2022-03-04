import Box from '@mui/material/Box';
import { useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField,Typography  } from '@mui/material';
import * as React from 'react';
import axios from 'axios';



function EditStatusModal({apiUrl,handleStatusChange,statu,updateStatusList,token,item,title,setTitle})  {
 
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
 
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

const statusEdit = (id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const editData = {
        title,
        categoryId:item.id
    }
    axios.put( 
        `${apiUrl}/status/${id}`,
        editData,
        config
      )


      .then(res => setTitle(res.data.title),    updateStatusList(item.id))
      updateStatusList(item.id)
      handleClose()


}

useEffect(()=>{  updateStatusList(item.id)   },[title])

    
      return (
        <>
          <Button sx={{mr:"1rem"}} onClick={handleOpen} variant="contained">Status Düzenle</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{mb:"2rem"}} id="modal-modal-title" variant="h6" component="h2">
                Status Düzenleme
              </Typography>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mx: "auto" }}>
              <TextField  onChange={handleStatusChange} name="title" id="outlined-basic" label="Status Düzenle" variant="outlined" defaultValue={statu.title}/>
             
              <Button onClick={() => statusEdit(statu.id)}  variant="contained">DÜZENLE</Button> </Box>
            </Box>
          </Modal>
          </>
      );
    }
export default EditStatusModal