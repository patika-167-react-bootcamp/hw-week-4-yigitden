import * as React from 'react';
import {InputLabel,MenuItem,Box,ListItemButton,ListItemText,Button,Typography,FormControl,Select} from '@mui/material';
import { useEffect,useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

const TodoList = ({ todoList, updateTodoList,token,categoryList,todoTitle,apiUrl }) => {

    const deleteTodo = (idTodo) => {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
      
        axios.delete(
          `${apiUrl}/todo/${idTodo}`,config
        )
        .then(updateTodoList())
        updateTodoList()
      }
    
    useEffect(() => {
        updateTodoList()
    }, [])
   
    const [updatedCategoryId,setUpdatedCategoryId] = useState('')
    const [updatedStatusId,setUpdatedStatusId] = useState('')
    const [updatedStatus,setUpdatedStatus] = useState([])

    const handleUpdatedCategory = (event) => {
        setUpdatedCategoryId(event.target.value)
        updateUpStatusList(event.target.value)
        
      }
      
   
      const updateUpStatusList = (idStatus) => {

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(
          `${apiUrl}/status?categoryId=${idStatus}`, config
        )
          .then(res =>
            setUpdatedStatus(res.data)
          )
      }
 

   

    const updateTodo = (event,idStatus,title) => {
        setUpdatedStatusId(event.target.value)
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const updateTodoData={
            title: title,
            categoryId: parseInt(updatedCategoryId),
            statusId: parseInt(updatedStatusId)
          }
        axios.put(
          `${apiUrl}/todo/${idStatus}`,
           updateTodoData,
           config
        )
        .then(updateTodoList())
        updateTodoList()
        
      }






    return (

      
        <Box sx={{ width:900, display: 'flex', flexDirection: 'column', alignItems: 'space-evenly', justifyContent: 'center', mx: "auto", mt: "2rem" }} >
          <Typography sx={{mb:"2rem"}} id="modal-modal-title" variant="h6" component="h2">
        Todo List
      </Typography>
       
        
        
        {todoList.map((todo) => 

            <ListItemButton key={todo.id} component="a" >
                <FilterListIcon sx={{ mr:"1rem"}}/><ListItemText primary={todo.title} />
                
                
                
                
                <FormControl sx={{ width: 250, mr:"1rem"}}>
                <InputLabel id="demo-simple-select-label">Kategori</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                   defaultValue={todo.categoryId}
                   label="Kategori"
                   onChange={handleUpdatedCategory}
          >
                   

                   {categoryList.map((category, index) =>

                        <MenuItem value={category.id} key={index} name={category.title}>{category.title}</MenuItem>

                            )}

                           
                </Select>





            </FormControl>
            <FormControl sx={{ width: 250, mr:"1rem"}}>
                <InputLabel id="demo-simple-select-label">Statu</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={todo.statusId}
                    label="Statu"
                    onChange={(event) => updateTodo(event,todo.id,todo.title)} 
          >
               
               {updatedStatus.map((statu, index) =>

<MenuItem value={statu.id} key={index}>{statu.title}</MenuItem>

)}

                   
</Select>

            </FormControl>



 
                <Button sx={{ mr: "1rem" }} onClick={() => deleteTodo(todo.id)} variant="contained">SİL</Button>
                
            </ListItemButton>
         
            
            )}
            </Box>

    )
}




export default TodoList