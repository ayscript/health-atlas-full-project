export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-slide-in">
      <div className="bg-card border border-secondary/30 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-2 items-center">
          <div
            className="w-2.5 h-2.5 bg-secondary rounded-full animate-recording-wave"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2.5 h-2.5 bg-secondary/70 rounded-full animate-recording-wave"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2.5 h-2.5 bg-secondary/40 rounded-full animate-recording-wave"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  )
}
