function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 px-8 py-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-xl">🥝</span>
          <span className="font-bold text-emerald-400">
            Kiwi<span className="text-slate-100">Cine</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-400"
            >
              TMDB
            </a>
          </span>
        </div>

        <a
          href="https://github.com/gustavo-lqt"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
        >
          GitHub · gustavo-lqt
        </a>
      </div>
    </footer>
  );
}

export default Footer;
