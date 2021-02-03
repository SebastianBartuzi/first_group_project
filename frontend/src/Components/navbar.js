import { Link, NavLink } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from '../images/logo.svg';
import "../Styles/Navbar.css"

const navbar = () =>  
{
    return (
        <Navbar className="navbar navbar-expand navbar-dark" style={{backgroundColor: "#925bc9"}}> 
        <Nav.Link as={Link} to="/" className="navbar-brand" style={{paddingLeft: "0px"}}>
            <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="logo"/>
            <span className="h2" style={{ fontFamily:'Lilita One', marginLeft: "5px" }}>Project <span style={{ color:"#ffd91d" }}>Happy</span></span>
        </Nav.Link>

        <div className="collapse navbar-collapse" id="navbarNav" style={{fontStyle: 'italic'}}>
            <ul className="navbar-nav mr-auto">
                <Nav.Link as={Link} to="/" className="nav-item ml-3" style={{marginLeft: "15px"}}>Random</Nav.Link>

                <NavDropdown title="Categories" style={{marginLeft: "15px"}}>
                    <NavDropdown.Item as={Link} to="/">Cats</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">Quizzes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">Minigames</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">Jokes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">Quotes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">Daily Pool</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="#" style={{marginLeft: "15px"}}>Favourites</Nav.Link>
            </ul>

            <ul className="navbar-nav mr-auto" style={{position: 'absolute', right: 20}}>
                <Nav.Link as={Link} to="/login" className="nav-item mr-3">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-item mr-3" style={{marginRight: "10px", marginLeft: "15px"}}>Register</Nav.Link>
            </ul>
        </div>
        </Navbar>
    );
}

export default navbar;