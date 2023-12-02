import AppContext from "../../context/AppContext";
import "./SongLibrary.css";
import { useState, useContext } from "react";
import { Typography, Card, Button } from "@mui/joy";
import { Link } from "react-router-dom";

const SongLibrary = () => {
  const { chords, scales, setSongs, user, handleDelete, songs, selectedScale } =
    useContext(AppContext);

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
      </div>

      <h1 className="title">Song Library</h1>
      {songs.map((song) => (
        <Card
          className="song-card"
          color="primary"
          invertedColors
          variant="solid"
        >
          <div className="songs" key={song.id}>
            <h2>{song.name}</h2>
            <h3>
              Your song "{song.name}" is using the scale {selectedScale.name}
            </h3>
            <Button>Edit</Button>
            <Button onClick={() => handleDelete(song.id)}>Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default SongLibrary;
