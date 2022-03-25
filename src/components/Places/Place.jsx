import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Place = ({places}) => {
    const { id } = useParams();
    const [place, setplace] = useState({})

    useEffect(() => {
        const p = places.find(p => p.id.toString() === id)
        setplace(p)


    },[id])


 

    return(
        <div>
            <img src={ place.image } alt="place picture" height="300" width="350"  />
            <h1>{ place.name }</h1>
            <h3> Address: {place.address}</h3>
            <h3> Price: {place.price}</h3>
            <h3> Category: {place.category}</h3>
            <h3> Notes: {place.notes}</h3>


        </div>
    )
}


export default Place;