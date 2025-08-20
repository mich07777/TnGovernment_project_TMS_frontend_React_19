import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logo } from '../../assets/images';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

function DpoNavBar() {
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
                <Nav.Link as={Link} to="/DpoSpecialUnit">Home</Nav.Link>
                <NavDropdown title="Data Bank" id="navbarScrollingDropdown">
                    <NavDropdown.Item as={Link} to="/DpoDatabankCRUD">Add / Edit / Delete Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/DpoDownloadtemplate">Download Template</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/DpoUploadExcel">Upload Excel</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link as={Link} to="/CreateCourse">Personal Nomination</Nav.Link> */}
                <Nav.Link as={Link} to="/NominationShortList">Nomination Shortlist</Nav.Link>
                <Nav.Link as={Link} to="/CollateandSent">Course Feedback</Nav.Link>
                <Nav.Link as={Link} to="/ApprovedListInternalCommunication">Reports</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex me-2 title-clr"><Avatar style={{background:'#232771'}}/><h6 className='title-clr mt-2'>&nbsp;&nbsp;DPO / CPO / Spl units</h6></div>
        </Container>
      </Navbar>
    );
  }
  
export default DpoNavBar