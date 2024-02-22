import AppContext from "../../context/AppContext";
import "./SongLibrary.css";
import { useState, useContext } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";
import { Link } from "react-router-dom";

const SongLibrary = () => {
  const {
    chords,
    scales,
    setSongs,
    user,
    handleDelete,
    songs,
    newSongName,
    setNewSongName,
    logout,
  } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});

  const handleClose = () => {
    setNewSongName("");
    // setNewSong([]);
    setIsModalOpen(false);
  };

  // const handleEdit = async (id) => {
  //   const { data: song } = await axios.put(
  //     `http://localhost:4001/songs/${id}`,
  //     {
  //       name: newSongName,
  //       user_id: user.id,
  //       scale_id: selectedScale.id,
  //     }
  //   );

  const handleEdit = async (id) => {
    const { data: editedSong } = await axios.put(
      `https://us-central1-music-theory-butler.cloudfunctions.net/api/songs/${id}`,
      {
        name: newSongName,
      }
    );
    setNewSongName("");

    setSongs((prevState) => {
      return prevState.map((song) =>
        song.id === editedSong.id ? { ...song, name: editedSong.name } : song
      );
    });

    handleClose();
  };

  return (
    <div className="Song-Library">
      <div className="nav-bar">
        <div className="home-button">
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
        <div className="library-button">
          <Button>Song Library</Button>
        </div>
        <div className="logout">
          <Button onClick={logout}>LOGOUT</Button>
        </div>
      </div>

      <h1 className="title">Song Library</h1>
      {songs.map((song) => (
        <Card
          className="song-card"
          color="primary"
          invertedColors
          variant="solid"
          key={song.id}
        >
          <div className="songs">
            <h2>{song.name}</h2>
            <h3>Your song "{song.name}" is using the scale</h3>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedSong(song);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(song.id)}>Delete</Button>
          </div>
        </Card>
      ))}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Edit Your Song Name</DialogTitle>
          <Typography>Check out your song in the Song Library!</Typography>
          <FormControl>
            <FormLabel>Song Name</FormLabel>
            <Input
              required
              onChange={(e) => setNewSongName(e.target.value)}
              placeholder="Type in here…"
              sx={{
                "&::before": {
                  border: "1.5px solid var(--Input-focusedHighlight)",
                  transform: "scaleX(0)",
                  left: "2.5px",
                  right: "2.5px",
                  bottom: 0,
                  top: "unset",
                  transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                  borderRadius: 0,
                  borderBottomLeftRadius: "64px 20px",
                  borderBottomRightRadius: "64px 20px",
                },
                "&:focus-within::before": {
                  transform: "scaleX(1)",
                },
              }}
            />
          </FormControl>
          <FormControl></FormControl>
          <Button onClick={() => handleEdit(selectedSong.id)} type="submit">
            Submit
          </Button>
        </ModalDialog>
      </Modal>
    </div>
  );
};
export default SongLibrary;
