import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chords, setChords] = useState([]);
  const [songs, setSongs] = useState([]);
  const [scales, setScales] = useState([]);
  const [selectedScale, setSelectedScale] = useState({});
  const [newSongName, setNewSongName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
  }, []);

  useEffect(() => {
    const getSongs = async () => {
      const response = await axios.get(
        `https://us-central1-music-theory-butler.cloudfunctions.net/api/users/${user.id}/songs`
      );
      setSongs(response.data);
    };

    const getScales = async () => {
      const response = await axios.get(
        "https://us-central1-music-theory-butler.cloudfunctions.net/api/scales"
      );
      setScales(response.data);
    };

    const getChords = async () => {
      const response = await axios.get(
        `https://us-central1-music-theory-butler.cloudfunctions.net/api/chords`
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
    try {
      const response = await axios.post(
        "https://us-central1-music-theory-butler.cloudfunctions.net/api/login",
        {
          email,
          password,
        }
      );
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        console.error("Login failed.");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://us-central1-music-theory-butler.cloudfunctions.net/api/songs/${id}`
    );

    const newSongs = [...songs];
    const indexToDelete = newSongs.findIndex((s) => s.id === id);
    newSongs.splice(indexToDelete, 1);
    setSongs(newSongs);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        scales,
        chords,
        songs,
        login,
        logout,
        setSongs,
        handleDelete,
        selectedScale,
        setSelectedScale,
        newSongName,
        setNewSongName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
