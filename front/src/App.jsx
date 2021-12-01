import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import SignUp from "./components/user/createUser/User";
import Login from "./components/user/login/Login";
import ManageContacts from "./components/contacts/ManageContacts";
import Location from "./components/location/Location";

import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faCheckSquare,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlusSquare, faCheckSquare, faCoffee);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/contacts" element={<ManageContacts />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/location" element={<Location />} />
        {/* <Route path="/companies" element={<Companies />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
