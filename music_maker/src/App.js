import "./App.css";
// import Logout from "./components/Logout";
import Login from "./components/Login";
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import Router from "./Router";

function App() {
  const { user } = useContext(AppContext);

  return (
    <div className="App">
      <Router />
      {/* {user ? ( <> <Router /> <Logout /> </> ) : ( <Login /> )} */}
    </div>
  );
}

const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
