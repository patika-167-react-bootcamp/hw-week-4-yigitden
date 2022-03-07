import * as React from 'react';
import { Box, ListItemButton, ListItemText, Button, Typography, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
 
import SelectedStatus from './SelectedStatus'

const TodoList = ({ todoList, updateTodoList, token,apiUrl,categoryList  }) => {



  const deleteTodo = (idTodo) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.delete(
      `${apiUrl}/todo/${idTodo}`, config
    )
      .then(updateTodoList())
    updateTodoList()
  }

  useEffect(() => {
    updateTodoList()
  }, [])






  return (






    <Box sx={{ width: 900, display: 'flex', flexDirection: 'column', alignItems: 'space-evenly', justifyContent: 'center', mx: "auto", mt: "2rem" }} >
     
      <Typography sx={{ mb: "2rem" }} id="modal-modal-title" variant="h6" component="h2">
        Todo List                      
        
      </Typography>
    
 

      {todoList.map((todo) =>
        <Box sx={{ border: "1", width: 900, display: 'flex', flexDirection: 'column', alignItems: 'space-evenly', justifyContent: 'center', mx: "auto", mb: "1rem" }} >

          <ListItemButton key={todo.id} component="a" >
            <FilterListIcon sx={{ mr: "1rem" }} /><ListItemText primary={todo.title} />


 
            
              <SelectedStatus
              title={todo.title}
              todoId={todo.id}
              categoryId = {todo.categoryId}
               statusId = {todo.statusId}
                token = {token}
                apiUrl={apiUrl}
                  categoryList={categoryList}
                  updateTodoList={updateTodoList} />


           

        


            
            <Button sx={{ mr: "1rem" }} onClick={() => deleteTodo(todo.id)} variant="contained">SİL</Button>

          </ListItemButton>
        </Box>

      )}
    </Box>

  )
}




export default TodoList