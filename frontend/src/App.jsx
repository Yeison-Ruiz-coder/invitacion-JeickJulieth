import { useEffect, useRef, useState } from 'react'
import './App.css'
import GoldStarsBackground from './components/GoldStarsBackground'
import InvitationPage from './components/InvitationPage'
import AdminPage from './components/AdminPage'

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminPage />
  }

  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [hasStartedVideo, setHasStartedVideo] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!showWelcome || !audioRef.current) return

    audioRef.current
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false))
  }, [showWelcome])

  useEffect(() => {
    if (!isVideoOpen || !videoRef.current) return

    const video = videoRef.current
    video.volume = 0
    video.currentTime = 0

    const playVideo = async () => {
      try {
        await video.play()

        const startVolume = 0
        const targetVolume = 0.5
        const duration = 1300
        const startTime = performance.now()

        const fadeIn = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          video.volume = startVolume + (targetVolume - startVolume) * progress

          if (progress < 1) {
            requestAnimationFrame(fadeIn)
          }
        }

        requestAnimationFrame(fadeIn)
      } catch {
        video.volume = 0.5
      }
    }

    playVideo()
  }, [isVideoOpen])

  const handleOpenVideo = () => {
    if (isVideoOpen || hasStartedVideo) return

    setHasStartedVideo(true)
    setIsVideoOpen(true)
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
        <button
          type="button"
          className="admin-access-star"
          onClick={() => { window.location.href = "/admin"; }}
          aria-label="Abrir panel privado"
          title="Panel privado"
        >
          ★
        </button>
        <InvitationPage />
        <audio
          ref={audioRef}
          src="/audio/Rabito%20-%20un%20mundo%20diferente%20(letra)%20-%20LA%20VERDAD%20Y%20LA%20VIDA%20(1).mp3"
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
          src="https://res.cloudinary.com/dixyebg5i/image/upload/v1789937323/J_F_hnriso.png"
          alt="Invitación de boda de Jeick y Fernanda"
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
        <div className="video-overlay" aria-live="polite" role="presentation">
          <div className="video-box">
            <video
              ref={videoRef}
              className="invitation-video"
              src="https://res.cloudinary.com/dixyebg5i/video/upload/v1789937315/J_F_yxvne0.mp4"
              autoPlay
              muted={false}
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
