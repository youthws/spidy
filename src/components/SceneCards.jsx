import { useRef, useState } from "react";
import { useExperience } from "./ExperienceContext";
import "./SceneCards.css";

export default function SceneCards() {
  const { section } = useExperience();

  const [selectedCard, setSelectedCard] = useState(null);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // ==========================================
  // SCENE DATA
  // ==========================================

  const cards = [
    {
      number: "1",
      title: "Tobey Maguire",
      description:
        "With great power comes great responsibility.",
      video: "/videos/scene-1.mp4",
      audio: "/audio/scene-1.mp3",
      thumbnail: "/images/scene-1.jpg",
    },

    {
      number: "2",
      title: "Andrew Garfield",
      description:
        "You are Spider-Man, and I love you guys!",
      video: "/videos/scene-2.mp4",
      audio: "/audio/scene-2.mp3",
      thumbnail: "/images/scene-2.jpg",
    },

    {
      number: "3",
      title: "Tom Holland",
      description:
        "If you're nothing without this suit, then you shouldn't have it.",
      video: "/videos/scene-3.mp4",
      audio: "/audio/scene-3.mp3",
      thumbnail: "/images/scene-3.jpg",
    },
  ];

  // ==========================================
  // ONLY SHOW WHEN SCENES IS SELECTED
  // ==========================================

  if (section !== "scenes") {
    return null;
  }

  // ==========================================
  // OPEN VIDEO
  // ==========================================

  const openVideo = (card) => {
    setSelectedCard(card);
    setPlaying(false);
  };

  // ==========================================
  // PLAY VIDEO + MP3 TOGETHER
  // ==========================================

  const playVideo = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    try {
      // VIDEO MUTED
      video.muted = true;

      // AUDIO VOLUME
      audio.volume = 1;

      // Make both start from the same position
      audio.currentTime = video.currentTime;

      // Start both
      await video.play();
      await audio.play();

      setPlaying(true);
    } catch (error) {
      console.error("PLAY ERROR:", error);
    }
  };

  // ==========================================
  // PAUSE BOTH
  // ==========================================

  const pauseVideo = () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.pause();
    }

    if (audio) {
      audio.pause();
    }

    setPlaying(false);
  };

  // ==========================================
  // CLOSE POPUP
  // ==========================================

  const closeVideo = () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setPlaying(false);
    setSelectedCard(null);
  };

  return (
    <>
      {/* ==========================================
          SCENE CARDS
      ========================================== */}

      <div className="scene-cards">

        <div className="scene-cards-header">
          <span>
            THESE EDITS ARE TAKEN FROM ONLINE PLATFORM, NOT MINE.
          </span>

          <div></div>
        </div>

        <div className="scene-cards-grid">

          {cards.map((card) => (

            <div
              className="scene-card"
              key={card.number}
              onClick={() => openVideo(card)}
            >

              <div className="scene-card-media">

                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="scene-card-thumbnail"
                />

                <div className="scene-card-overlay"></div>

                <span className="scene-number">
                  {card.number}
                </span>

                <button
                  className="scene-play"
                  onClick={(e) => {
                    e.stopPropagation();
                    openVideo(card);
                  }}
                >
                  ▶
                </button>

              </div>

              <div className="scene-card-info">

                <h2>{card.title}</h2>

                <p>{card.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ==========================================
          VIDEO POPUP
      ========================================== */}

      {selectedCard && (

        <div
          className="video-popup"
          onClick={closeVideo}
        >

          <div
            className="video-popup-content"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              className="video-popup-close"
              onClick={closeVideo}
            >
              ✕
            </button>

            {/* TITLE */}

            <div className="video-popup-title">

              <span>
                {selectedCard.number}
              </span>

              <h2>
                {selectedCard.title}
              </h2>

            </div>

            {/* VIDEO */}

            <div className="video-popup-video">

              <video
                ref={videoRef}
                src={selectedCard.video}
                loop
                playsInline
                controls
                preload="metadata"
              />

            </div>

            {/* HIDDEN AUDIO */}

            <audio
              ref={audioRef}
              src={selectedCard.audio}
              preload="auto"
            />

            {/* DESCRIPTION */}

            <p className="video-popup-description">
              {selectedCard.description}
            </p>

            {/* CONTROLS */}

            <div className="video-popup-controls">

              {!playing ? (

                <button onClick={playVideo}>
                  ▶ PLAY SCENE
                </button>

              ) : (

                <button onClick={pauseVideo}>
                  ❚❚ PAUSE
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </>
  );
}