// Deterministic pattern so server and client render the same markup
const cells = [
  1, 0, 2, 0, 1, 0, 0, 3,
  0, 2, 0, 1, 0, 3, 1, 0,
  3, 0, 1, 0, 2, 0, 0, 1,
  0, 1, 0, 3, 0, 1, 2, 0,
]

const tones = ["bg-transparent", "bg-[#3b4fd8]", "bg-[#3b4fd8]/40", "bg-[#3b4fd8]/15"]

export function PixelPattern() {
  return (
    <div aria-hidden className="grid grid-cols-8 gap-[4px]">
      {cells.map((tone, i) => (
        <span key={i} className={`size-[10px] rounded-[2px] ${tones[tone]}`} />
      ))}
    </div>
  )
}
