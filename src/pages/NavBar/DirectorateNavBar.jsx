import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logo } from '../../assets/images';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';


function NavBar() {
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
            <Nav.Link as={Link} to="/TrainingDirectorate">Home</Nav.Link>
            <NavDropdown title="Data Bank" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/UploadIFHRMSData">Upload IFHRMS Data</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/DatabankCRUD">Add / Edit / Delete Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Downloadtemplate">Download Template</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/SendProfile">Send Profile</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/CreateCourse">Create & Publish Course</Nav.Link>
            <NavDropdown title="Masters" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/MasterTrainingCenter">Training Center List</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MTrainingCenter">Training Center Details</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterLocations">Locations</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterRank">Rank</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterQualification">Qualifications</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterModeofReceiving">Mode of Receiving</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterDocumentType">Document Type</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterPublishTo">Publish To</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterCity">City</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterCourseAttendedCenter">Course Attended Center</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterCourseType">Course Type</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterDistrictList">District</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterRange">Range</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterSplUnits">Sex</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterSplUnits">Spl.Units</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterStatus">Status</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterSubdivision">Sub-Division</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterUnits">Units</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MasterZones">Zones</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/HopfLetterOutside">HoPF</Nav.Link>
            <Nav.Link as={Link} to="/CollateandSent">Collate</Nav.Link>
            <Nav.Link as={Link} to="/ApprovedListInternalCommunication">Internal Communication</Nav.Link>
            <Nav.Link as={Link} to="/DirectorateCCupload">Course Completion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex me-2 title-clr"><Avatar style={{background:'#232771'}}/><h6 className='title-clr mt-2'>&nbsp;&nbsp;Training Directorate</h6></div>
      </Container>
    </Navbar>
  );
}

export default NavBar;