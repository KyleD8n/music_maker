import AppContext from "../../context/AppContext";
import { useState, useContext } from "react";
import "./Login.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Typography } from "@mui/joy";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const { login } = useContext(AppContext);

  const handleClick = () => {
    try {
      login(email, password);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login_page">
      <div className="login_ui">
        <h1>Please Login My Fellow Shredder</h1>
        <div>
          <h3>Email</h3>
          <Input
            error={error}
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
            error={error}
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
      <div>{error && <Typography>{error.message}</Typography>}</div>
    </div>
  );
};

export default Login;
