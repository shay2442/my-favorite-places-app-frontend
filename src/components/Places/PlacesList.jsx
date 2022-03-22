import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import PlaceCard from './PlaceCard'
import PlaceForm from './PlaceForm'
import {Router,
    Routes,
    Route
  } from "react-router-dom";


const PlacesList = ({loggedIn, places, addItem, handleDelete, updatePlace}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if( !loggedIn ) {
            navigate('/login')
        }
    }, [loggedIn])


    
    // for every place we have we are going to create a place card
    const placeCards = places.map(place => <PlaceCard key={place.id } place={place} handleDelete={handleDelete} updatePlace={updatePlace}/>)

    return (

        <div>
            <h1>Places</h1>
            <PlaceForm addItem={addItem}/>
            { placeCards } 
            
        </div>

        
    )
}


export default PlacesList;