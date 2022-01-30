import { faHome, faInfoCircle, faSignInAlt, faSignOutAlt, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import "./HeaderNav.scss";

export default function HeaderNav({activeTab}) {
  let links = [
    {path: "/", name: "home", icon: faHome},
    {path: "/about", name: "about", icon: faInfoCircle},
    {path: "/sign-in", name: "sign-in", icon: faSignInAlt},
    {path: "/sign-up", name: "sign-up", icon: faUserPlus},
    {path: "/sign-in", name: "sign-out", icon: faSignOutAlt}
  ];

  const cookies = new Cookies();

  let user = {
    username: cookies.get("username"),
    userId: cookies.get("userid")
  }

  return (
    <nav id="headerNav" className="nav justify-content-end w-100">
      {/*
      links.map((link, id) => (
        <Link to={link.path}
       className={`nav-link ${link.name} ${link.name === activeTab ? "active" : ""}`}
             key={`link${id}`}>
          <FontAwesomeIcon icon={link.icon} /> {link.name.replace("-", " ")}
        </Link>))
      */}
      <Link to="/" className="nav-link home"><FontAwesomeIcon icon={faHome} /> Home</Link>
      <Link to="/about" className="nav-link about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link>
      {user.username
        ? <>
          <Link to={`/user${user.userId}`} className="nav-link account"><FontAwesomeIcon icon={faUser} /> Account</Link>
          <Link to="/sign-out" className="nav-link sign-out"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</Link></>
        : <>
          <Link to="/sign-in" className="nav-link sign-in"><FontAwesomeIcon icon={faSignInAlt} /> Sign In</Link>
          <Link to="/sign-up" className="nav-link sign-up"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</Link></>
      }
    </nav>
  )
}
