import React from "react";
import {useNavigate} from 'react-router-dom';

import { Navbar, Container, Nav } from 'react-bootstrap';


const Header = ({toggleMode, userEmail}) => {
    const navigate = useNavigate();

    const addFavList = () =>{
        navigate('/addFavList');
    }

    const addVideo = () =>{
        navigate('/addVideo');
    }

    const toHome = () =>{
        navigate('/');
    }

    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand onClick={toHome}>Barzoiu</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link onClick={addFavList}>Add Favourite List</Nav.Link>
            <Nav.Link onClick={addVideo}>Add Video To A Favourite List</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default Header