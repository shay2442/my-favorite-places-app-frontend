
import {useState, useEffect} from 'react'
import { baseUrl, headers, getToken } from '../../Globals'
import {Button, Form, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router-dom'

const PlaceForm = ({addItem, places, updateItem}) => {
    const params = useParams()
    

    const initialState={ 
        image: '',
        name: '',
        address: '',
        price: '',
        category: '',
        notes: ''

    }

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
        fetch(`http://localhost:3001/places`,{
            method: "POST",
            headers,
            body: JSON.stringify(formData),
        })
        .then(r=>r.json())
        .then((newItem) => {
            addItem(newItem)
            setFormData(initialState)
        })
    }

    function updatePlace(id) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
          }
        fetch(`http://localhost:3001/places/${id}`,{
            method: "PATCH",
            headers,
            body: JSON.stringify(formData),
        })
        .then(r=>r.json())
        .then((updatedItem) => {
            updateItem(updatedItem)
            setFormData(initialState)
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
        <div>
             <form onSubmit={handleSubmit}className="form">
            <label>
                Image:
                <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}>
                </input>
            </label>

            <label>
                Name:
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                ></input>
            </label>

            <label>
                Address:
                <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                ></input>
            </label>
            <label>
                Price:
                <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            >
                <option value='$'>$</option>
                <option value='$$'>$$</option>
                <option value='$$$'>$$$</option>
                
                    </select></label>
            <label>
                Category:
                <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                ></input>
            </label>
            <label>
                Notes:
                <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                ></input>
            </label>
           

            <button className='submit-bttn' type="submit">Add Place</button>
        </form>
        </div>
    )
}


export default PlaceForm;