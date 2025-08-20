import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logo } from '../../assets/images';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

function IgpNavBar() {
    return (
      <Navbar expand="lg" className="bg-white">
        <Container fluid>
          <Navbar.Brand href="#"><img src={logo} className="img-fluid" style={{width:'80px'}}   alt="Sample image" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                <Nav.Link as={Link} to="/Igp">Home</Nav.Link>
                <Nav.Link as={Link} to="/IgpApproval">Nomination Approval</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex me-2 title-clr"><Avatar style={{background:'#232771'}}/><h6 className='title-clr mt-2'>&nbsp;&nbsp;IGP</h6></div>
        </Container>
      </Navbar>
    );
}

export default IgpNavBar