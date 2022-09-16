
import './App.css';
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation/Navigation'
import Home from './components/static/Home'
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import PlacesList from './components/Places/PlacesList'
import PlaceForm from './components/Places/PlaceForm'
import Place from './components/Places/Place'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { baseUrl, headers, getToken } from './Globals'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [places, setPlaces] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate 

  function handleSearch(newSearch) {
    setSearch(newSearch)
  }

  const loginUser = user => {
    setCurrentUser(user);
    setLoggedIn(true);
  }

  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token && !loggedIn) {
      fetch(baseUrl + '/get-current-user', {
        method: "GET",
        headers: {
          ...headers,
          ...getToken() 
          // returns authorization plus localStorage.getItem('jwt') that should send it and we want a response back
        
        }
      })
      .then(r =>r.json())
      .then(user => loginUser(user))

    }

    if(loggedIn) {
      fetch(baseUrl + '/places', {
        headers: {
          ...headers,
          ...getToken()
        }
      })
      .then(r => r.json())
      .then(data => setPlaces(data))

    }
  },[loggedIn])

  function addItem(newItem) {
    setPlaces([newItem,...places])
  }

  function updateItem(updatedItem) {
    const newPlaces = places.map(place => {
      if (updatedItem.id === place.id){
          return updatedItem
      } else {
          return place
      }
    })

    setPlaces(newPlaces)
    
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/places/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      }

    })
    .then(() => {
      const updatedPlaces = places.filter((place) => id !== place.id)
      setPlaces(updatedPlaces)
    })
  }


  return (
    
    <div className='app' >

      {/* <header className="App-header">
        My Favorite Places App
      </header> */}
      <Router>
        {/* { loggedIn ? <h1>Welcome, {currentUser.username}! </h1> : null } */}
      <Navigation loggedIn={loggedIn} logoutUser={logoutUser} currentUser={ currentUser } />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup loginUser = { loginUser } loggedIn={ loggedIn } />} />
        <Route path="/login" element={<Login loginUser={ loginUser } loggedIn={ loggedIn }/>} />
        <Route path="/places" element={<PlacesList loggedIn={ loggedIn } places={ places } addItem={addItem} handleDelete={handleDelete} search={search} handleSearch={handleSearch} />} />
        <Route path="/places/:id" element={<Place loggedIn={ loggedIn } places={ places } />} />
        <Route exact path="/places/:id/edit" element={<PlaceForm places={places} addItem={addItem} updateItem={updateItem} />} />
        <Route exact path="/places/new" element={<PlaceForm places={places} addItem={addItem} updateItem={updateItem} />} />
      </Routes>
      
      </Router>
      
    </div>
  );
}

export default App;
