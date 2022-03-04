import { useState,useEffect} from 'react';
import { TextField,Typography,Modal,Button,Box  } from '@mui/material';
import * as React from 'react';
import axios from 'axios';



function EditCategoryModal({item,token,setCategory,category,updateList,apiUrl})  {
 
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

      const handleCategoryEdit = (event) => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        setCategory(prev => ({ ...prev, [name]: value }))
      }
    
      const categoryEdit = (id) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put( 
            `${apiUrl}/category/${id}`,
            category,
            config
          )
    
      .then(res => setCategory(res.data.title), updateList())
      updateList()
      handleClose()
        }
       useEffect(() => {updateList()},[category])
    
      return (
        <>
          <Button sx={{mr:"1rem"}} onClick={handleOpen} variant="contained">Kategori Düzenle</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{mb:"2rem"}} id="modal-modal-title" variant="h6" component="h2">
                Kategori Düzenleme
              </Typography>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mx: "auto" }}>
              <TextField  onChange={handleCategoryEdit} name="title" id="outlined-basic" label="Kategori Düzenle" variant="outlined" defaultValue={item.title}/>
              <Button onClick={() => categoryEdit(item.id)} variant="contained">DÜZENLE</Button>
              </Box>
            </Box>
          </Modal>
          </>
      );
    }
export default EditCategoryModal