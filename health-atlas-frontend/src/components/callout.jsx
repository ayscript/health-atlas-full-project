export function Callout() {
  return (
    <div
      className="
            mt-16 p-8 rounded-2xl 
            max-w-[480px] mx-auto
            bg-white/60 backdrop-blur-xl 
            border border-blue-200/50 shadow-xl
            text-center
          "
    >
      <p className="text-gray-800 text-lg leading-relaxed">
        <span className="font-bold text-blue-900">Powered by N-ATLaS</span> — an
        African-first large language model trained to understand local culture,
        communication styles, and real healthcare needs.
      </p>
    </div>
  );
}
