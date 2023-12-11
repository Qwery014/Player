import cover1 from "../assets/music/Bellyache/maxresdefault.jpg"
import cover2 from "../assets/music/Cheri cheri lady/115730861.jpg"
import cover3 from "../assets/music/Don't Stop Me Now/27ca78589c387bdc552e46281ba71bd2.jpg";
import cover4 from "../assets/music/Sara perche ti amo/pic.jpg"

import audio1 from "../assets/music/Bellyache/Billie Eilish - Bellyache.mp3"
import audio2 from "../assets/music/Cheri cheri lady/Modern Talking - Cheri Cheri Lady (Official Music Video).mp3"
import audio3 from "../assets/music/Don't Stop Me Now/Queen - Don't Stop Me Now (Official Video).mp3"
import audio4 from "../assets/music/Sara perche ti amo/Sarà perchè ti amo - Ricchi e poveri - testo.mp3"

import background1 from "../assets/background/rainTheme.mp4";
import background2 from "../assets/background/stars.mp4";
import background3 from "../assets/background/storm.mp4";


export const trackList = [
  {
    id: 1,
    name: "Bellyache",
    author: "Billie Eilish",
    music: audio1,
    cover: cover1,
    mainColor: "#000000",
    colors: [
      "#DEB128",
      "#212624",
      "#FFFFFF",
    ]
  }, {
    id: 2,
    name: "Cheri Cheri Lady",
    author: "Modern Talking",
    music: audio2,
    cover: cover2,
    mainColor: "#CC7097",
    colors: [
      "#DEB128",
      "#212624",
      "#FFFFFF",
    ]
  }, {
    id: 3,
    name: "Don't Stop Me Now",
    author: "Queen",
    music: audio3,
    cover: cover3,
    mainColor: "#000000",
    colors: [
      "#DEB128",
      "#212624",
      "#FFFFFF",
    ]
  }, {
    id: 4,
    name: "Sarà perchè ti amo",
    author: "Ricchi e poveri",
    music: audio4,
    cover: cover4,
    mainColor: "#96BCC3",
    colors: [
      "#DEB128",
      "#212624",
      "#FFFFFF",
    ]
  }
]



export const backgrounds = [
  {
    id: 1,
    background: background1,
    name: "Rain",
    isDark: false,
  },
  {
    id: 2,
    background: background2,
    name: "Star sky",
    isDark: true,
  },
  {
    id: 3,
    background: background3,
    name: "Storm",
    isDark: false,
  },

]