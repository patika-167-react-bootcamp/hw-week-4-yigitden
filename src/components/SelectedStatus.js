import { useState,useEffect } from "react";
import { InputLabel,ListItemText} from '@mui/material';
import axios from "axios";
import UpdateTodo from './UpdateTodo'

const SelectedStatus = ({statusId,categoryId,token,apiUrl,title,categoryList,todoId,updateTodoList}) => {
    const [updatedCategory,setUpdatedCategory] = useState([])


    const updateUpCategoryList = (categoryId) => {
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(
          `${apiUrl}/category/${categoryId}`, config
        )
          .then(res =>
            setUpdatedCategory(res.data)
          )
      }

      useEffect(()=> {
        updateUpCategoryList(categoryId)
      },[])


  
  
    const [updatedStatus,setUpdatedStatus] = useState([])


    const updateUpStatusList = (statusId) => {
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(
          `${apiUrl}/status/${statusId}`, config
        )
          .then(res =>
            setUpdatedStatus(res.data)
          )
      }

      useEffect(()=> {
        updateUpStatusList(statusId)
      },[])

 

    return(
        <>
 
 <InputLabel id="demo-simple-select-label">Kategori : </InputLabel>


<ListItemText primary={updatedCategory.title} /> 
              
 
                <InputLabel id="demo-simple-select-label">Statu : </InputLabel>


                <ListItemText primary={updatedStatus.title} /> 

                <UpdateTodo 
                    title={title}
                    categoryId = {updatedCategory.id}
                     statusId = {updatedStatus.id}
                      token = {token}
                      apiUrl={apiUrl}
                      categoryList={categoryList}
                      todoId={ todoId}
                      updateTodoList={updateTodoList}
                      />
        
      
        </>
        
    )
}

export default SelectedStatus
/*



  




 */