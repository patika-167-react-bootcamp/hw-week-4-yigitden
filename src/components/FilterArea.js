
import {InputLabel,MenuItem,FormControl,Select,Button,Box} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


const FilterArea = ({categoryList,token,setTodoList,todoList,apiUrl}) => {

    const [filteredStatus,setFilteredStatus] = useState([])
    const [filteredStatusId,setFilteredStatusId] = useState('')
    const [filteredCategoryId,setFilteredCategoryId] = useState('')

    const handleFilteredCategory = (event) => {
        setFilteredCategoryId(event.target.value)
        updateFilterStatusList(event.target.value)
      }

      const updateFilterStatusList = (idStatus) => {

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get(
          `${apiUrl}/status?categoryId=${idStatus}`, config
        )
          .then(res =>
            setFilteredStatus(res.data)
          )
      }
     
      const filterTodo = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
      
          axios.get(
            `${apiUrl}/todo`, config
          )
            .then(res =>
                setTodoList(res.data)
            ) 
      }
        useEffect(() => {filterTodo()},[])

        const filtered = () => {

             const newArray = todoList.filter((todo)=> todo.categoryId == filteredCategoryId && todo.statusId == filteredStatusId )
             setTodoList(newArray)
                    }

          
  
    return (
        <Box sx={{ width: 900, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mx: "auto", mt:"20px" }}>
          
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Kategori</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue=""
                   label="Kategori"
                   onChange={handleFilteredCategory}
          >
                     {categoryList.map((category, index) =>

                         <MenuItem value={category.id} key={index}>{category.title}</MenuItem>

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
            onChange={(event) => setFilteredStatusId(event.target.value)} 
          >
                 {filteredStatus.map((statu, index) =>

                    <MenuItem value={statu.id} key={index}>{statu.title}</MenuItem>

                    )}
</Select>

            </FormControl>
            <Button onClick={() => filtered()} variant="contained" >FİLTRELE</Button>
            <Button  onClick={() => filterTodo()} variant="contained" >FİLTREYİ TEMİZLE</Button>
        </Box>
    )
}

export default FilterArea