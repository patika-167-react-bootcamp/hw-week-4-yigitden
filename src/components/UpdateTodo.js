import * as React from 'react';
 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {InputLabel,MenuItem,FormControl,Select,Button,Box} from '@mui/material';




const UpdateTodo = ({token,apiUrl,title,todoId,updateTodoList} ) => {
    const [selectedStatus,setSelectedStatus] = useState([])
    const [selectedCategoryId,setSelectedCategoryId] = useState('')
    const [selectedStatusId,setSelectedStatusId] = useState('')
    const [categoryUpdateList, setCategoryUpdateList] = useState([]);
   
    
      const updateListt = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          axios.get(
            `${apiUrl}/category`,
            config
          )
    
          .then(res => 
            setCategoryUpdateList(res.data) )
      }


      const updateTodo = (todoId, title) => {

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const updateTodoData = {
          title,
          categoryId: selectedCategoryId,
          statusId: selectedStatusId
        }
        axios.put(
          `${apiUrl}/todo/${todoId}`,
          updateTodoData,
          config
        )
          .then(updateTodoList())
          updateTodoList()
       
        handleClose() 
    
      }

      useEffect(() => {
        updateTodoList()
      }, [])
      
    

    const handleSelectedCategory = (event) => {
        setSelectedCategoryId(event.target.value)
        updateSelectedStatusList(event.target.value)
      }

      const updateSelectedStatusList = (idStatus) => {

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(
          `${apiUrl}/status?categoryId=${idStatus}`, config
        )
          .then(res =>
            setSelectedStatus(res.data)
          )
      }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'space-evenly',
      justifyContent: 'center', 
      mx: "auto",
      p: 4,
    };
    
    
      const [open, setOpen] = useState(false);
      const handleOpen = () => {
          setOpen(true)
          updateListt()
        
        };
      const handleClose = () => setOpen(false);
   
   
   
   return(
<>






<div>
<Button sx={{ mr: "1rem" }} onClick={handleOpen} variant="contained">GÜNCELLE</Button> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >



          <Typography id="modal-modal-title" variant="h6" component="h2">
            Todo Güncelle
          </Typography>
         
          <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Kategori</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue=""
                   label="Kategori"
                   onChange={handleSelectedCategory}
          >
                     {categoryUpdateList.map((category, index) => (

                         <MenuItem value={category.id} key={index}>{category.title}</MenuItem>
                   )

                        )}      
                </Select>





            </FormControl>
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Statu</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                   defaultValue=""
            label="Statu"
            onChange={(event) => setSelectedStatusId(event.target.value)} 
          >
                 {selectedStatus.map((statu, index) =>

                    <MenuItem value={statu.id} key={index}>{statu.title}</MenuItem>

                    )}
</Select>

            </FormControl>

            <Button sx={{ mr: "1rem" }} onClick={() => updateTodo(todoId,title)} variant="contained">GÜNCELLE</Button> 
          
        </Box>
      </Modal>
    </div>















</>
    )
}

export default UpdateTodo