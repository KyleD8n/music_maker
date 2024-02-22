import "./Home.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";
import * as Tone from "tone";
import {
  Typography,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";
import Logout from "../Logout";

const Home = () => {
  const [newSong, setNewSong] = useState([]);
  const [selectedChords, setSelectedChords] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const chorus = new Tone.Chorus(1, 2.5, 0.5).toDestination().start();
  const synth = new Tone.Synth().connect(chorus);

  // const synth = new Tone.Synth().toDestination();

  const {
    chords,
    scales,
    setSongs,
    user,
    logout,
    selectedScale,
    setSelectedScale,
    newSongName,
    setNewSongName,
  } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async () => {
    const { data: song } = await axios.post(
      `https://us-central1-music-theory-butler.cloudfunctions.net/api/songs`,
      {
        name: newSongName,
        user_id: user.id,
        scale_id: selectedScale.id,
      }
    );

    setSongs((prevState) => [...prevState, song]);
    handleClose();
  };

  const handleClose = () => {
    setNewSongName("");
    setNewSong([]);
    setIsModalOpen(false);
  };

  const handleChordClick = (chord) => {
    setSelectedChords((prevState) => [...prevState, chord]);
    setSelectedButton((prevState) =>
      prevState === chord.name ? null : chord.name
    );
    const chordName =
      chord.name === "A" || chord.name === "A#" || chord.name === "B"
        ? `${chord.name}2`
        : `${chord.name}3`;
    synth.triggerAttackRelease(chordName, `8n`);
  };

  const getStringChords = (chords, startingId) => {
    const stringChords = [...chords];
    stringChords.sort((a, b) => {
      const aId =
        a.id >= startingId
          ? a.id - startingId
          : a.id + (chords.length - startingId);
      const bId =
        b.id >= startingId
          ? b.id - startingId
          : b.id + (chords.length - startingId);
      return aId - bId;
    });
    return stringChords;
  };
  const EStringChords = getStringChords(chords, 9);
  const AStringChords = getStringChords(chords, 2);
  const DStringChords = getStringChords(chords, 4);
  const GStringChords = getStringChords(chords, 7);
  const BStringChords = getStringChords(chords, 12);

  return (
    <div className="Home">
      <div className="nav-bar">
        <div className="home-button">
          <Button>Home</Button>
        </div>
        <div className="library-button">
          <Link to="/songLibrary">
            <Button>Song Library</Button>
          </Link>
        </div>
        <div className="logout-button">
          <Button onClick={logout}>LOGOUT</Button>
        </div>
      </div>

      <h1>Music Theory Butler</h1>
      <h3>Chords</h3>

      <div className="chord-selector">
        {chords.map((chord) => (
          <div className="chords" key={chord.id}>
            <Button
              className={`${chord.name} chord-button`}
              onClick={() => handleChordClick(chord)}
              color={selectedButton === chord.name ? "neutral" : "primary"}
              variant="solid"
            >
              {chord.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="main-fretboard">
        <div className="string-1-chords">
          {EStringChords.map((chord) => (
            <div className="chord" key={chord.id}>
              <Button
                // sx={{
                //     borderRadius: "100px",
                // }}
                className="string-chords"
                onClick={() => handleChordClick(chord)}
                color={selectedButton === chord.name ? "danger" : "primary"}
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="string-2-chords">
          {AStringChords.map((chord) => (
            <div className="chord" key={chord.id}>
              <Button
                className="string-chords"
                onClick={() => handleChordClick(chord)}
                color={selectedButton === chord.name ? "danger" : "primary"}
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="string-3-chords">
          {DStringChords.map((chord) => (
            <div className="chord" key={chord.id}>
              <Button
                className="string-chords"
                onClick={() => handleChordClick(chord)}
                color={selectedButton === chord.name ? "danger" : "primary"}
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="string-4-chords">
          {GStringChords.map((chord) => (
            <div className="chord" key={chord.id}>
              <Button
                className="string-chords"
                onClick={() => handleChordClick(chord)}
                color={selectedButton === chord.name ? "danger" : "primary"}
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="string-5-chords">
          {BStringChords.map((chord) => (
            <div className="chord" key={chord.id}>
              <Button
                className="string-chords"
                onClick={() => handleChordClick(chord)}
                color={selectedButton === chord.name ? "danger" : "primary"}
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="string-6-chords">
          {EStringChords.map((chord) => (
            <div className="chord" key={chord.id}>
              <Button
                className="string-chords"
                onClick={() => handleChordClick(chord)}
                color={selectedButton === chord.name ? "danger" : "primary"}
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <h3>Scales</h3>
      <div className="scales-container">
        {scales
          .filter((scale) => {
            let hasSelectedChords = true;
            selectedChords.forEach((selectedChord) => {
              if (!scale.chord_ids.includes(selectedChord.id)) {
                hasSelectedChords = false;
              }
            });
            return hasSelectedChords;
          })
          .map((scale) => (
            <div className="scale" key={`scales-${scale.id}`}>
              <Button
                onClick={() => {
                  setSelectedScale(scale);
                  setIsModalOpen(true);
                }}
                variant="outlined"
                size="lg"
              >
                {scale.name}
              </Button>
            </div>
          ))}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalDialog>
            <ModalClose />
            <DialogTitle>Create Your Song</DialogTitle>
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
            <FormControl>{selectedScale.name}</FormControl>
            <Button onClick={handleSave} type="submit">
              Submit
            </Button>
          </ModalDialog>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
