
import {useState, useEffect} from 'react'
import { baseUrl, headers, getToken } from '../../Globals'
import {Button, Form, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router-dom'

const PlaceForm = ({addItem, places}) => {
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

    function handleSubmit(e) {
        e.preventDefault()
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
          }
        console.log('headers', headers)
        fetch("http://localhost:3001/places",{
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




    return(
        <div>
              <Form onSubmit={handleSubmit}className="form">
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
            name="price"
            value={formData.price}
            onChange={handleChange}
            >
                <option value='all'>Price</option>
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
            <input type="submit" value={formData.id ? "Update" : "Create"}/>


            {/* <button className='submit-bttn' type="submit">Add Place</button> */}
        </Form>
        </div>
    )
}


export default PlaceForm;