
import {useState, useEffect} from 'react'
import { baseUrl, headers, getToken } from '../../Globals'
// import {Button, Form, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {  TextField, Container } from '@mui/material';





const PlaceForm = ({addItem, places, updateItem}) => {
    const params = useParams()
    const URL = 'http://localhost:3001/places'

   
    const initialState={ 
        image: '',
        name: '',
        address: '',
        price: '',
        category: '',
        notes: ''

    }

    const navigate = useNavigate();

    const [formData, setFormData]= useState(initialState)

    useEffect(() => {
        if(params.id && places.length > 0){
            //find the place
            const placeWeWantToEdit = places.find(place => place.id === parseInt(params.id))
            console.log(placeWeWantToEdit)
            setFormData(placeWeWantToEdit)
        }else {
            setFormData(initialState)
        }
    },[params, places])

    function handleChange(e) {
        setFormData( {...formData,
        [e.target.name]: e.target.value})
    }

    function createPlace() {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
          }
        fetch( URL ,{
            method: "POST",
            headers,
            body: JSON.stringify(formData),
        })
        .then(r=>r.json())
        .then((newItem) => {
            addItem(newItem)
            setFormData(initialState)})
                navigate('/places')
    }

    function updatePlace(id) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
          }
        fetch(URL + `/${id}`,{
            method: "PATCH",
            headers,
            body: JSON.stringify(formData),
        })
        .then(r=>r.json())
        .then((updatedItem) => {
            updateItem(updatedItem)
            setFormData(initialState)
            navigate('/places')
        })

    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!formData.id) {
            createPlace()
        } else {
            updatePlace(formData.id)
        }
    }




    return(
        <Container display='flex'>
             <form margin="normal" onSubmit={handleSubmit}>
             <TextField
                
                label="Image"
                
                fullWidth
                type="text"
                name="image"
                value={formData?.image}
                onChange={handleChange}/>

                <TextField
                label="Name"
                
                fullWidth
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}/>

                <TextField
               
                label="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}/>           
                
            <label>
                Price:
                <select
            name="price"
            value={formData.category}
            onChange={handleChange}
            >
                <option value='$'>$</option>
                <option value='$$'>$$</option>
                <option value='$$$'>$$$</option>
                    </select></label>

                <TextField
                
                label="category"
                
                fullWidth
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}/>

                <TextField
                
                label="Notes"
                
                fullWidth
                multiline
                rows={4}
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}/>
           
           

           <input type="submit" value={formData.id ? "Update" : "Create"}/>
            
        </form>
        </Container>
    )
}


export default PlaceForm;