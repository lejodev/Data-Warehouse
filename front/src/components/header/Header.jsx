import "./_header.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      <div className="logo">
        <Link className="logo-text link" to="/">
          DATA WAREHOUSE
        </Link>
      </div>
      <ul className="links">
        <li>
          <Link className="link" to="/contacts">
            CONTACTS
          </Link>
        </li>
        <li className="link">
          <Link className="link" to="/signUp">
            USERS
          </Link>
        </li>
        <li className="link">
          <Link className="link" to="/companies">
            COMPANIES
          </Link>
        </li>
        <li className="link">
          <Link className="link" to="/location">
            REGION/CITY
          </Link>
        </li>
      </ul>
    </nav>
    // <header className="header">

    //   <div className="links">
    //     <a className="link" href="contacts.html">
    //       Contacts
    //     </a>
    //     <a className="link" href="#">
    //       Companies
    //     </a>
    //     <a className="link" href="users.html">
    //       Users
    //     </a>
    //     <a className="link" href="cities.html">
    //       Region/City
    //     </a>
    //   </div>
    // </header>
  );
};

export default Header;
