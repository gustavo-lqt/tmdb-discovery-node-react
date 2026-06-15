import { useNavigate } from "react-router-dom";

function Hero({ item }) {
  const {
    id,
    type,
    title,
    backdrop,
    about,
    rating,
    year,
    runtime,
    seasons,
    episodes,
  } = item;

  const navigate = useNavigate();

  // Format the meta line differently for movies vs series
  const metaExtra =
    type === "tv"
      ? seasons &&
        `${seasons} Season${seasons > 1 ? "s" : ""} · ${episodes} Episodes`
      : runtime && `${Math.floor(runtime / 60)}h ${runtime % 60}min`;

  return (
    <div
      onClick={() => navigate(`/title/${type}/${id}`)}
      className="relative mb-10 h-[620px] cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 transition-transform hover:scale-[1.01]"
      style={
        backdrop
          ? {
              backgroundImage: `url(${backdrop})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 max-w-2xl p-8">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
          🔥 #1 Trending today
        </span>

        <h1 className="mt-4 text-5xl font-extrabold text-white">{title}</h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
          <span className="font-semibold text-amber-400">★ {rating}</span>
          <span>·</span>
          <span>{year}</span>
          <span>·</span>
          <span>{type === "tv" ? "Series" : "Movie"}</span>
          {metaExtra && (
            <>
              <span>·</span>
              <span>{metaExtra}</span>
            </>
          )}
        </div>

        <p className="mt-4 text-slate-300 line-clamp-2">{about}</p>
      </div>
    </div>
  );
}

export default Hero;
