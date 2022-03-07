
import {InputLabel,MenuItem,FormControl,Select,TextField,Button,Box} from '@mui/material';
import { useState, useEffect } from 'react';
import * as React from 'react';
import ParentModal from './components/ParentModal'
import axios from 'axios';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import FilterArea from './components/FilterArea';


function Content({ token, setIsLogged, apiUrl }) {

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedStatusId, setSelectedStatusId] = useState();
  const [statusList, setStatusList] = useState([]);
  const [todoTitle,setTodoTitle] = useState();
  const [todoList,setTodoList] = useState([]);

 
  useEffect(() => {
    updateList()
  }, [todoList])


  const updateList = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(
      `${apiUrl}/category`,
      config
    )

      .then((response) => setCategoryList(response.data))
  }

  const handleSelectedCategory = (event) => {
    setSelectedCategoryId(event.target.value)
    updateStatusList(event.target.value)
  }

  const updateStatusList = (idStatus) => {

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(
      `${apiUrl}/status?categoryId=${idStatus}`, config
    )
      .then(res =>
        setStatusList(res.data)
      )
      .catch((err) => {alert('Todo Eklenemedi!')})

  }

  const addTodo = () => {

    
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      const todoData={
        title: todoTitle,
        categoryId: parseInt(selectedCategoryId),
        statusId: parseInt(selectedStatusId)
      }
  
      axios.post(
        `${apiUrl}/todo`,
        todoData,
         config
      )
        .then(updateTodoList())
        .catch((err) => { alert("Todo Eklenemedi") })
        updateTodoList()
   
    

  }


  
  const updateTodoList = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
 
    axios.get(
      `${apiUrl}/todo`,
       config
    )
      .then(res => setTodoList(res.data)
      )

  }
 
  return (

    <>
    <Navbar
    setIsLogged={setIsLogged}/>
   
    <FilterArea
    categoryList={categoryList}
    statusList={statusList}
    setStatusList={setStatusList}
    token={token}
    setTodoList={setTodoList}
    todoList={todoList}
    apiUrl={apiUrl}
    />
      <Box sx={{ width: 900, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mx: "auto", mt: "20px" }}>
        <TextField id="outlined-basic" name="todoTitle" label="To do Ekle" variant="outlined" onChange={(e)=> setTodoTitle(e.target.value)}/>
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="demo-simple-select-label">Kategori</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            value={selectedCategoryId}
            label="Kategori"
            onChange={handleSelectedCategory}
          >
            {categoryList.map((category, index) =>

              <MenuItem value={category.id} key={index}>{category.title}</MenuItem>

            )}
          </Select>





        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="demo-simple-select-label">Statu</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            value={selectedStatusId}
            label="Statu"
            onChange={(event) => setSelectedStatusId(event.target.value)}
          >
            {statusList.map((statu, index) =>

              <MenuItem value={statu.id} key={index}>{statu.title}</MenuItem>

            )}
          </Select>

        </FormControl>
        <Button onClick={addTodo} variant="contained" >+</Button>

        <ParentModal
          token={token}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          apiUrl={apiUrl} />
      </Box>
      <TodoList 
      todoList={todoList}
    
      updateTodoList={updateTodoList}
      token={token}
      categoryList={categoryList}
      statusList={statusList}
      updateStatusList ={updateStatusList}
      todoTitle={todoTitle}
      apiUrl={apiUrl}
     
      />
    </>
  );
}


export default Content

