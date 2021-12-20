import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="">
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-light">
        <li>
          <Link to="/HomePage" className="nav-link px-2 link-dark">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/PregFrecuentes" className="nav-link px-2 link-dark">
            Preguntas Frecuentes
          </Link>
        </li>
        <li>
          <Link to="/InfoInteres" className="nav-link px-2 link-dark">
            Información de Interes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
