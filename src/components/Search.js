import {useState} from 'react'


function Search({onSearch}) {
    const [currentSearch, setCurrentSearch] = useState('')

  

    function handleSubmit(e) {
        e.preventDefault()
        onSearch(currentSearch)
        setCurrentSearch('')
    }

    return(
        
        <form onSubmit={handleSubmit} className='search'>
        {/* <TextField className={classes.field} label="Search Places" variant="outlined" color="primary" size="large"  */}
         
            <input
            type="text"
            name="search"
            placeholder="Search places..."
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value)}></input>
       {/* /> */}
        
        </form>

    )
}

export default Search;