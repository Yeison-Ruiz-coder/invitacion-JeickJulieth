import './GoldStarsBackground.css'

const sparkleStars = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 7 + 6) % 100}%`,
  size: 8 + (index % 4) * 4,
  delay: `${(index % 7) * 0.9}s`,
  duration: `${7 + (index % 5) * 2.5}s`,
  opacity: 0.35 + (index % 5) * 0.12,
}))

function GoldStarsBackground() {
  return (
    <div className="gold-stars" aria-hidden="true">
      {sparkleStars.map((star) => (
        <span
          key={star.id}
          className="gold-star"
          style={{
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default GoldStarsBackground
