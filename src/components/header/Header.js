import "./css/header.scss";
import logo from "../../assets/images/logo.jpeg";
import { NavBar } from "../navbar/NavBar";

export function Header() {
  return (
    <header className=" d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-1 mb-0 border-bottom">
      <a
        href="http://www.munisullana.gob.pe"
        className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none "
      >
        <img src={logo}></img>
      </a>
      <NavBar />
    </header>
  );
}
