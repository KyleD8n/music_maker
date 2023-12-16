import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Logout = () => {
  const { logout } = useContext(AppContext);

  return (
    <div>
      <button className="logout-button" onClick={logout}>
        LOGOUT
      </button>
    </div>
  );
};
export default Logout;
