import "./_header.scss";

const Header = () => {
    return (
    <header className="header">
        <div className="logo">
            <a className="logo-text link" href="index.html">DATA WAREHOUSE</a>
        </div>
        <div className="links">
            <a className="link" href="contacts.html">Contacts</a>
            <a className="link" href="#">Companies</a>
            <a className="link" href="users.html">Users</a>
            <a className="link" href="cities.html">Region/City</a>
        </div>
    </header>)
}

export default Header;