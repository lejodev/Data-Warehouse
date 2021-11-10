import "./App.scss";
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
    <div>
      <Header />
      {/* <ManageContacts/> */}
      <SignUp />
      {/* <Login /> */}
      {/* <Location /> */}
    </div>
  );
}

export default App;
