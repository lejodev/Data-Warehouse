import "./App.scss";
// import DemoComponent from "./components/component1/component1";
import Header from "./components/header/Header";
import User from "./components/user/User";
import ManageContacts from "./components/contacts/ManageContacts";

const TestComponent = () => (
  <div className="custom_class">Otro componente MOD</div>
);

function TestComponent2() {
  return <div>Componente 2</div>;
}

function App() {
  return (
    <div>
      <Header />
      {/* <ManageContacts/> */}
      <User />
    </div>
  );
}

export default App;