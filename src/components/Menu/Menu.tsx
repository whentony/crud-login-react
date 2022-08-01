import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
function Menu() {
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">TesteEmpresa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/register" className='btn-primary btn text-white fw-bold'>Register</Nav.Link>
                            <Nav.Link href="/table" className='btn-primary btn text-white fw-bold'>Table</Nav.Link>
                            <Nav.Link href="#" onClick={() => handleLogout()} className='btn btn-outline-danger text-dark fw-bold'>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Menu;