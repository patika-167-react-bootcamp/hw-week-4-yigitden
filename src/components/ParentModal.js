import {Box,Button,Modal,TextField, Typography,ListItemButton,ListItemText} from '@mui/material';
import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import ChildModal from './ChildModal'
import EditCategoryModal from './EditCategoryModal'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  mb: "10px"
};

export default function ParentModal({ token,categoryList,setCategoryList,apiUrl }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [category, setCategory] = useState([]);

  const handleCategoryChange = (event) => {

    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setCategory(prev => ({ ...prev, [name]: value }))

  }

  const handleCategoryAdd = () => {

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post(
      `${apiUrl}/category`,
      category,
      config
    )
      .then(updateList())
      .catch((err) => { alert("Kategori Eklenemedi !") })

   
  }


  useEffect(() => {
    updateList()
  }, [])


  const updateList = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(
      `${apiUrl}/category`,
      config
    )

      .then(response => setCategoryList(response.data))
  }

  const deleteCategory = (catId) => {

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.delete(
      `${apiUrl}/category/${catId}`, config
    )
      .then(updateList())
    updateList()
  }
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Kategori Ekle</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography  sx={{mb:"1rem"}} id="modal-modal-title" variant="h6" component="h2">
            Kategori Ekleme Alanı
          </Typography>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mx: "auto" }}>
          <TextField sx={{width:400}} onChange={handleCategoryChange} name="title" id="outlined-basic" label="Kategori Ekle" variant="outlined" />
          <Button onClick={handleCategoryAdd} variant="contained">+</Button>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'space-evenly', justifyContent: 'center', mx: "auto" , mt:"1rem"}} >
            {categoryList.map((item) =>
          
              <ListItemButton key={item.id} component="a" >
                <ListItemText primary={item.title} />

                
                <Button sx={{mr:"1rem"}} onClick={() => deleteCategory(item.id)} variant="contained">SİL</Button>
                <EditCategoryModal
                  item={item}
                  token={token}
                  setCategory={setCategory}
                  category={category}
                  updateList={updateList}
                  apiUrl={apiUrl}

                />
                <ChildModal
                  item={item}
                  token={token}
                  apiUrl={apiUrl}

                />
              </ListItemButton>
              
            )}

          </Box>
        </Box>
      </Modal>
    </>
  );
}
