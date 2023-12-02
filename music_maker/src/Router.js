import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SongLibrary from "./components/SongLibrary";

const Router = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/songLibrary" element={<SongLibrary />} />
    </Routes>
  );
};

export default Router;
