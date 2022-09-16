import { useNavigate } from 'react-router-dom'
import {Link } from 'react-router-dom'
import {headers, getToken} from '../../Globals'
import styled from 'styled-components'
import { ButtonGroup, Icon } from '@mui/material';

const PlaceCard = ({ place, handleDelete, updatePlace }) => {
    const navigate = useNavigate()
    const {id, image, name, address, price, category, notes} = place
    

    // function updatePlace(e){
        
    //     const configObj = {
    //         method: "PATCH",
    //         headers: {
    //             ...headers,
    //             ...getToken()
    //           },
    //         body: JSON.stringify({})
    //     }
    //     fetch(`http://localhost:3001/places/${id}`, configObj)
    //     .then(r => r.json())
    //     .then(data => {

    //         console.log(data)
    //         updatePlace(data)
    //         navigate('/places')
            
    //     })
        // change state 
        // change db 
      
    // }

    

    return(
        <RecipeWrapper>
        <div className="card">
        <img className='image' src={place.image} alt="No Pic"/>
            <div><strong>Name:  {place.name}</strong></div>
            <ButtonGroup orientation='vertical' variant='contained'>

            <button onClick={ () => navigate(`/places/${place.id}`)}>View Notes</button>
            <button onClick={ () => navigate(`/places/${place.id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(id)}>🗑 Delete Place</button>
            </ButtonGroup>
            {/* <Link to={`/places/${id}/edit`}><button>Edit</button></Link> */}
    
        </div>
        </RecipeWrapper>


    )
}

export default PlaceCard;
const RecipeWrapper = styled.div `
 width: 200px;
    margin: 10px;
    padding: 25px;
    box-shadow:  0 0 20px rgba(0, 0, 0, 1.0), 0 0 40px rgba(0, 0, 0, 0.12);
    border-radius: 5px;`