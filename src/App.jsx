import { useEffect, useRef, useState } from 'react'
import './App.css'
import GoldStarsBackground from './components/GoldStarsBackground'
import InvitationPage from './components/InvitationPage'

function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!showWelcome || !audioRef.current) return

    audioRef.current
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false))
  }, [showWelcome])

  const handleOpenVideo = () => {
    if (!isVideoOpen) {
      setIsVideoOpen(true)
    }
  }

  const handleVideoEnd = () => {
    setIsVideoOpen(false)
    setShowWelcome(true)
  }

  const handleMusicToggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false))
      return
    }

    audio.pause()
    setIsMusicPlaying(false)
  }

  if (showWelcome) {
    return (
      <>
        <InvitationPage />
        <audio
          ref={audioRef}
          src="/audio/Por Amarte Así.mp3"
          loop
          preload="auto"
          onPlay={() => setIsMusicPlaying(true)}
          onPause={() => setIsMusicPlaying(false)}
        />
        <button
          type="button"
          className={`vinyl-player${isMusicPlaying ? ' is-playing' : ''}`}
          onClick={handleMusicToggle}
          aria-label={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          <img
            src="https://res.cloudinary.com/dixyebg5i/image/upload/v1789885887/png-transparent-vinyl-disc-art-phonograph-record-lp-record-vinyl-record-miscellaneous-desktop-wallpaper-sound-recording-and-reproduction-thumbnail_xqg0wl.png"
            alt="Vinilo decorativo y control de música"
          />
        </button>
      </>
    )
  }

  return (
    <main className="invitation-cover" onClick={handleOpenVideo} role="presentation">
      <GoldStarsBackground />

      <div className="cover-frame">
        <img
          className="cover-image"
          src="https://res.cloudinary.com/dixyebg5i/image/upload/v1789856339/ChatGPT_Image_19_sept_2026_05_14_35_p.m._b2iu2i.png"
          alt="Invitación de boda de Jeick y Julieth"
        />

        <button
          type="button"
          className="click-text"
          onClick={(event) => {
            event.stopPropagation()
            handleOpenVideo()
          }}
          aria-label="Reproducir video"
        >
          hacer click
        </button>
      </div>

      {isVideoOpen && (
        <div className="video-overlay" aria-live="polite" onClick={() => setIsVideoOpen(false)} role="presentation">
          <div className="video-box">
            <video
              className="invitation-video"
              src="https://res.cloudinary.com/dixyebg5i/video/upload/v1789867250/invitacion-final_1_mlurfq.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              controls={false}
              onEnded={handleVideoEnd}
              aria-label="Video de invitación"
            />
          </div>
        </div>
      )}

    </main>
  )
}

export default App
