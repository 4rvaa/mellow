export default function MellowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <video
        className="h-full w-full object-cover opacity-35"
        src="/mellow-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-[#4D3827]/30" />
    </div>
  );
}