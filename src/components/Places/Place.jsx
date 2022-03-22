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
            <img src={ place.image } alt="place picture"/>
            <div> Address:{place.address}</div>
            <div> Price:{place.price}</div>
            <div> Category:{place.category}</div>
            <div> Notes:{place.notes}</div>


        </div>
    )
}


export default Place;