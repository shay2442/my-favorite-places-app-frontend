import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import Search from "../Search";

// import PlaceForm from './PlaceForm'
// import {Router,
//     Routes,
//     Route
//   } from "react-router-dom";

const PlacesList = ({
  loggedIn,
  places,
  search,
  handleSearch,
  handleDelete,
  updatePlace,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  let placesToDisplay = places.filter((place) => {
    return place.name.toLowerCase().includes(search.toLowerCase());
  });

  // for every place we have we are going to create a place card
  console.log(places);
  const placeCards = placesToDisplay.map((place) => (
    <PlaceCard
      key={place.id}
      place={place}
      handleDelete={handleDelete}
      updatePlace={updatePlace}
    />
  ));

  return (
    <div className="orders-page">
      <Search onSearch={handleSearch} search={search} />
      <div className="card-container">
        {/* <PlaceForm addItem={addItem}/> */}
        {placeCards}
      </div>
    </div>
  );
};

export default PlacesList;
