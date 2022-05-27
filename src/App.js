import {useState, useEffect} from 'react';
import Player from './components/Player/Player';

function App() {
  const [songs] = useState([
    {
      title: "Death of a Strawberry",
      artist: "Dance Gavin Dance",
      img_src: "./images/song-1.jpg",
      src: "./music/death-of-a-strawberry.mp3"
    },
    {
      title: "Things We Used To Do",
      artist: "Oliver Tree",
      img_src: "./images/song-2.jpg",
      src: "./music/things-we-used-to-do.mp3"
    },
    {
      title: "Circles",
      artist: "Post Malone",
      img_src: "./images/song-3.jpg",
      src: "./music/circles.mp3"
    },
    {
      title: "Sleeptalk",
      artist: "Dayseeker",
      img_src: "./images/song-4.jpg",
      src: "./music/sleeptalk.mp3"
    }
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player 
        currentSongIndex={currentSongIndex} 
        setCurrentSongIndex={setCurrentSongIndex} 
        nextSongIndex={nextSongIndex} 
        songs={songs}
      />
    </div>
  );
}

export default App;
