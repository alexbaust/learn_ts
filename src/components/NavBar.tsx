import { Link } from 'react-router-dom';
import '../styles/NavBar.styles.css';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to={'/'}>Wordle</Link>
            </div>
            <div className="navbar-Links">
                <Link to={'/'}>Home</Link>
                <Link to={'/score'}>Score</Link>
            </div>
        </nav>
    );
}

export default NavBar;
