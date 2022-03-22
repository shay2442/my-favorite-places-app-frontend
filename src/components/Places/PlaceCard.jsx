import { useNavigate } from 'react-router-dom'
import {Link } from 'react-router-dom'
import {headers, getToken} from '../../Globals'

const PlaceCard = ({ place, handleDelete, updatePlace }) => {
    const navigate = useNavigate()
    const {id, image, name, address, price, category, notes} = place
    

    function updatePlace(e){
        
        const configObj = {
            method: "PATCH",
            headers: {
                ...headers,
                ...getToken()
              },
            body: JSON.stringify({})
        }
        fetch(`http://localhost:3001/places/${id}`, configObj)
        .then(r => r.json())
        .then(data => {

            console.log(data)
            updatePlace(data)
        })
        // change state 
        // change db 
    }

    

    return(
        <div>
            <img src={ place.image } alt="place image" height="200" width="250"/>
            <div> Name:{place.name}</div>
            <button onClick={ () => navigate(`/places/${place.id}`)}>View Notes</button>
            {/* <div> Address:{place.address}</div>
            <div> Price:{place.price}</div>
            <div> Category:{place.category}</div>
            <div> Notes:{place.notes}</div> */} 
            <button onClick={() => handleDelete(id)}>🗑 Delete Place</button>
            <div>
            <Link to={`/places/${id}/edit`}><button>Edit</button></Link>
            </div>
        </div>


    )
}

export default PlaceCard;