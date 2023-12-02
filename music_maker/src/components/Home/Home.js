import "./Home.css";
import { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import Button from "@mui/joy/Button";

const Home = () => {
  const [newSongName, setNewSongName] = useState("");
  const [newSong, setNewSong] = useState([]);
  const [selectedChords, setSelectedChords] = useState([]);
  const { chords, scales, setSongs, user } = useContext(AppContext);
  const [isButtonSelected, setIsButtonSelected] = useState(true)

  const handleSave = async () => {
    const { data: song } = await axios.post(`http://localhost:4001/songs`, {
      name: newSong,
      progression: chords,
      user_id: user.id,
      scale: newSong,
    });

    setSongs(prevState => [...prevState, song])
  };

  const handleChordClick = (chord) => {
    setSelectedChords((prevState) => [...prevState, chord]);
    setIsButtonSelected(prevState => !prevState);
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
      <h1>Music Theory Butler</h1>
      <h3>Chords</h3>

      <div className="chord-selector">
        {chords.map((chord) => (
          <div className="chord" key={chord.id}>
            <Button
              className="chord-buttons"
              onClick={() => handleChordClick(chord)}
              color={isButtonSelected ? 'primary' : 'neutral'}
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
                color="primary"
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
                color="primary"
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
                color="primary"
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
                color="primary"
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
                color="primary"
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
                color="primary"
                variant="solid"
              >
                {chord.name}
              </Button>
            </div>
          ))}
        </div>

        {/* <div className="string-1">
          <div className="frets-1-6">
            <h5>F</h5>
            <h5>F#</h5>
            <h5>G</h5>
            <h5>G#</h5>
            <h5>A</h5>
            <h5>A#</h5>
          </div>
          <div className="frets-7-12">
            <h5>B</h5>
            <h5>C</h5>
            <h5>C#</h5>
            <h5>D</h5>
            <h5>D#</h5>
            <h5>E</h5>
          </div>
        </div>

        <div className="string-2">
          <div className="frets-1-6">
            <h5>C</h5>
            <h5>C#</h5>
            <h5>D</h5>
            <h5>D#</h5>
            <h5>E</h5>
            <h5>F</h5>
          </div>
          <div className="frets-7-12">
            <h5>F#</h5>
            <h5>G</h5>
            <h5>G#</h5>
            <h5>A</h5>
            <h5>A#</h5>
            <h5>B</h5>
          </div>
        </div>

        <div className="string-3">
          <div className="frets-1-6">
            <h5>G#</h5>
            <h5>A</h5>
            <h5>A#</h5>
            <h5>B</h5>
            <h5>C</h5>
            <h5>C#</h5>
          </div>
          <div className="frets-7-12">
            <h5>D</h5>
            <h5>D#</h5>
            <h5>E</h5>
            <h5>F</h5>
            <h5>F#</h5>
            <h5>G</h5>
          </div>
        </div>

        <div className="string-4">
          <div className="frets-1-6">
            <h5>D#</h5>
            <h5>E</h5>
            <h5>F</h5>
            <h5>F#</h5>
            <h5>G</h5>
            <h5>G#</h5>
          </div>
          <div className="frets-7-12">
            <h5>A</h5>
            <h5>A#</h5>
            <h5>B</h5>
            <h5>C</h5>
            <h5>C#</h5>
            <h5>D</h5>
          </div>
        </div>

        <div className="string-5">
          <div className="frets-1-6">
            <h5>A#</h5>
            <h5>B</h5>
            <h5>C</h5>
            <h5>C#</h5>
            <h5>D</h5>
            <h5>D#</h5>
            <div className="frets-7-12">
              <h5>E</h5>
              <h5>F</h5>
              <h5>F#</h5>
              <h5>G</h5>
              <h5>G#</h5>
              <h5>A</h5>
            </div>
          </div>
        </div>

        <div className="string-6">
          <div className="frets-1-6">
            <h5>F</h5>
            <h5>F#</h5>
            <h5>G</h5>
            <h5>G#</h5>
            <h5>A</h5>
            <h5>A#</h5>
          </div>
          <div className="frets-7-12">
            <h5>B</h5>
            <h5>C</h5>
            <h5>C#</h5>
            <h5>D</h5>
            <h5>D#</h5>
            <h5>E</h5>
          </div>
        </div> */}

        {/* <img src={fretboard1} className="fretboard-1" alt="fretboard" /> */}
      </div>

      <h3>Scales</h3>
      <div className="scales-container">
        {scales
          .filter((scale) => {
            let hasSelectedChords = true;
            console.log(hasSelectedChords);
            selectedChords.forEach((selectedChord) => {
              console.log(selectedChord);
              if (!scale.chord_ids.includes(selectedChord.id)) {
                hasSelectedChords = false;
              }
            });
            return hasSelectedChords;
          })
          .map((scale) => (
            <div className="scale" key={`scales-${scale.id}`}>
              <Button onClick={handleSave} variant="outlined" size="lg">{scale.name}</Button>
            </div>
          ))}
      </div>

      <div className="nav-bar">
        <div className="home-button">
          <Button>Home</Button>
        </div>
        <div className="library-button">
          <Button >Song Library</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
