import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/de_karb_logo.png';

function NavBar() {
    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Navbar.Brand as={Link} to="/">
                <img src={Logo} alt="de:karb Logo" width={300} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/parts">
                        Parts
                    </Nav.Link>
                    <Nav.Link as={Link} to="/nestingenv">
                        NestingEnv
                    </Nav.Link>
                    <Nav.Link as={Link} to="/hyperparameteroptimization">
                        HparamOpt
                    </Nav.Link>
                    <NavDropdown title="Sequencing" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/sequencing/mcts">
                            MCTS
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/sequencing/localsearch">
                            Local Search
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/sequencing/procreant">
                            Procreant
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
