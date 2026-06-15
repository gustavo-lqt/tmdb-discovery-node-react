// A single movie/series card: poster with badges, title and year below.
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const { type, title, year, rating, poster } = item;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/title/${type}/${item.id}`)}
      className="w-44 shrink-0 cursor-pointer group"
    >
      <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-900 ">
        {/* Poster */}
        {poster && (
          <img
            src={poster}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
        {/* Type badge */}
        <span className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white capitalize">
          {type === "tv" ? "Series" : "Movie"}
        </span>
        {/* Rating badge */}
        <span className="absolute top-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
          ★ {rating}
        </span>
      </div>
      {/* Title + year */}
      <h3 className="mt-2 text-sm font-semibold text-slate-100 truncate">
        {title}
      </h3>
      <p className="text-xs text-slate-400">{year}</p>
    </div>
  );
}

export default Card;
