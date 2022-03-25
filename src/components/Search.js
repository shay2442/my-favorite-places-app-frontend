import {useState} from 'react'
import { Button, Form, Container } from 'react-bootstrap'

function Search({onSearch}) {
    const [currentSearch, setCurrentSearch] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        onSearch(currentSearch)
        setCurrentSearch('')
    }

    return(
        <Container>
        <Form onSubmit={handleSubmit} className='search'>
        <Form.Group className="mb-3" controlId="searchForm">
            <Form.Control
            type="text"
            name="search"
            placeholder="Search places"
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value)}></Form.Control>
            </Form.Group>
        </Form>
        </Container>
    )
}

export default Search;