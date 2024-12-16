import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSubmenu = () => {
        setSubmenuOpen(!submenuOpen);
    };

    useEffect(() => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
    <a className="navbar-brand" href="#">Cocineria G12</a>
    <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarSupportedContent" aria-expanded={menuOpen} aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/"><i className="fas fa-home"></i> Home </NavLink>
            </li>
            {userRole === 'administrador' && (
                <>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" onClick={toggleSubmenu} aria-haspopup="true" aria-expanded={submenuOpen}>
                            <i className="fas fa-bars"></i> Menú
                        </a>
                        <div className={`dropdown-menu ${submenuOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                            <NavLink className="dropdown-item" to="/platos" onClick={() => { setMenuOpen(false); setSubmenuOpen(false); }}>
                                <i className="fas fa-utensils"></i> Platos
                            </NavLink>
                            <NavLink className="dropdown-item" to="/ingredientes" onClick={() => { setMenuOpen(false); setSubmenuOpen(false); }}>
                                <i className="fas fa-carrot"></i> Ingredientes
                            </NavLink>
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/orders" onClick={() => { setMenuOpen(false); }}>
                            <i className="fas fa-receipt"></i> Pedidos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/asistencia" onClick={() => { setMenuOpen(false); }}>
                            <i className="fas fa-hands-helping"></i> Asistencia
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/personal" onClick={() => { setMenuOpen(false); }}>
                            <i className="fas fa-users"></i> Personal
                        </NavLink>
                    </li>
                </>
            )}
            <li className="nav-item">
                <NavLink className="nav-link" to="/auth" onClick={() => { logoutSubmit(); setMenuOpen(false); }}>
                    <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </NavLink>
            </li>
        </ul>
    </div>
</nav>

    );
};

export default Navbar;
