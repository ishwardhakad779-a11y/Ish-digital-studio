export default function AnimatedGrid() {
  return (
    <div className="fixed inset-0 z-0 grid-bg opacity-40 pointer-events-none"
      style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)' }}
    />
  )
}
