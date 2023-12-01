import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [chords, setChords] = useState([])
    const [songs, setSongs] = useState([])
    const [scales, setScales] = useState([])


useEffect(() => {
    const getSongs = async () => {
      const response = await axios.get(
        `http://localhost:4001/users/${user.id}/songs`
      );
      setSongs(response.data);
    };

    const getScales = async () => {
        const response = await axios.get(
            'http://localhost:4001/scales'
        );
        setScales(response.data);
    };

    const getChords = async () => {
      const response = await axios.get(
        `http://localhost:4001/chords`
      );
      setChords(response.data);
    };

    if (user?.id) {
        getSongs();
    }
    getScales();
    getChords();
}, [user]);

const login = async (email, password) => {
    const response = await axios.post("http://localhost:4001/login", {
      email,
      password,
    });
    if (response.data) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      console.error("Login failed.");
    }
  };

return (
    <AppContext.Provider
      value={{
        user,
        scales,
        chords,
        songs,
        login
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
