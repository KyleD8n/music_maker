import AppContext from "../../context/AppContext";
import { useState, useContext } from "react";
import "./Login.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AppContext);

  const handleClick = () => {
    login(email, password);
  };

  return (
    <div className="login_page">
      <div className="login_ui">
        <h1>Please Login My Fellow Shredder</h1>
        <div>
          <h3>Email</h3>
          <Input
            color="primary"
            placeholder="You're a rockstar"
            size="lg"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <h3>Password</h3>
          <Input
            type="password"
            color="primary"
            placeholder="password=password"
            size="lg"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleClick}>LOGIN</Button>
      </div>
    </div>
  );
};

export default Login;
